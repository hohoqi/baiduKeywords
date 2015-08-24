<?php
namespace Index\Controller;
use Think\Controller;
class IndexController extends CommonController {
	public function _initialize(){
		parent::_initialize();
        $username = I('post.username');
        $user = explode(session('round'), base64_decode($username));
        if(ACTION_NAME != 'show') {
            if(session('USER_AUTH_KEY') == '') {
                $data = array(
                    'status' => 50099,
                    'title' => '登录已经失效',
                    'mess' => '对不起,登录信息已失效,请重新登录'
                );
                $this->ajaxReturn($data);
                exit();
            }else if(session('user') != $user[0]) {
                $data = array(
                    'status' => 50099,
                    'title' => '非法登录',
                    'mess' => '对不起,检测到您的登录信息不合法,请重新登录'
                );
                $this->ajaxReturn($data);
                exit();
            }
        }
	}

    //获取列表
    public function alist() {
        $event = A('Index','Event');

        $einfolist = $event->getList();
        $this->ajaxReturn($einfolist);
    }

    //添加
    public function add() {
        $data = $_POST;
        $data['time'] = time();
        $data['up_time'] = time();
        if(M('site')->add($data)) {
             $info['status'] = 1;
             $info['title'] = '添加成功';
             $info['mess'] = '恭喜你,添加站点成功';
            //添加完成就立即查询一次数据
            //$this->getSiteData($data);
        }else {
            $info['status'] = 2;
            $info['title'] = '添加失败';
            $info['mess'] = '对不起,请刷新后重试';
        }
        $this->ajaxReturn($info);
    }

    //删除
    public function delete() {
        if(M('site')->delete(I('post.id'))) {
            $info['status'] = 1;
        }else {
            $info['status'] = 2;
        }

        $this->ajaxReturn($info);
    }


    //获取单个站点信息
    public function getInfo() {
        $info = M('site')->where("id = '".I('post.id')."'")->find();
        $this->ajaxReturn($info);
    }

    //修改
    public function updata() {
        if(M('site')->save($_POST)) {
             $info['status'] = 1;
             $info['title'] = '修改成功';
             $info['mess'] = '恭喜你,修改站点成功';
            //添加完成就立即查询一次数据
            //$this->getSiteData();
        }else {
            $info['status'] = 2;
            $info['title'] = '修改失败';
            $info['mess'] = '对不起,请刷新后重试';
        }
        $this->ajaxReturn($info);
    }

    public function repeat() {
        $data = M('site')->where("id='".I('post.id')."'")->find();
        $jg = $this->getSiteData($data);

        if($jg) {
            //查询出来后保存到 site 表
            $dbdata = $jg;
            $dbdata['keywords'] = $data['keywords'];
            $dbdata['up_time'] = time();
            $jg2 = M('site')->where("id = '".$data['id']."'")->save($dbdata);

            //同时保存到report 表 但是要判断
            $this->dbUpdata($data, $jg);
            
            if($jg2) {
                $info['status'] = 1;
                $info['title'] = '更新成功';
                $info['mess'] = '恭喜你,更新成功';
                $info['data'] = $dbdata;
            }else {
                $info['status'] = 2;
                $info['title'] = '更新失败';
                $info['mess'] = '保存到数据库错误';
            }
        }else {

            $info['status'] = 2;
            $info['title'] = '更新失败';
            $info['mess'] = '未能成功更新';
        }

        $this->ajaxReturn($info);
    } 


    public function allSite() {
        $info = M('site')->select();
        $data['status'] = 1;
        $data['data'] = $info;
        $this->ajaxReturn($data);
    } 


    public function show() {

        $einfo = M('report')->where("s_id = '".I('get.id')."'")->order('time asc')->select();
        
        $arr=array();
        $time = '';
        $n = 0;
        foreach ($einfo as $k => $v) {
            if(empty($time)) {
                $arr[$n] = array();
                array_push($arr[$n], $v);
                $time = $v['time'];
            }else {
                if($v['time'] == $time) {
                    array_push($arr[$n], $v);
                    $time = $v['time'];
                }else {
                    $n++;
                    $arr[$n] = array();
                    array_push($arr[$n], $v);
                    $time = $v['time'];
                }
            }
        }


        //分页
        $psize = 30;
        $p = I('p') ? I('p') : 1;
        $start = (abs($p - 1)*$psize) > 0 ? (abs($p - 1)*$psize) : 0;
        $infolist = array_slice($arr, $start , $psize, false);

        //分页显示
        //获取分页个数
        $pageNum = count($arr) / $psize;
        $url = '/Index/Index/show/id/'.I('get.id');
        $this->page = $this->getPage($pageNum, $p, $url);


        $this->infolist = $infolist;
        $this->display();
    }

    private function getPage($pageNum, $p, $url) {
        $page = '<nav class="pull-right"><ul class="pagination">';

        //上一页
        $first = $p >= 2 ? $p-1 : 1;
        $page.= '<li><a href="'.$url.'/p/'.$first.'" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>';
        
        for($i = 0; $i < $pageNum; $i++) {
            $page.='<li';
            if($p == ($i+1)) {
               $page.=' class="active"';
            }
            $page.='><a href="'.$url.'/p/'.($i+1).'">'.($i+1).'<span class="sr-only">(current)</span></a></li>';
        }

        //下一页
        $last = $p < $pageNum ? $p+1 : $p;
        $page.= '<li><a href="'.$url.'/p/'.$last.'" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>';

        return $page;
    }


     //获取站点信息
    private function getSiteData($data) {
        $event = A('Index', 'Event');
        $einfo = $event->getSiteData($data);
        return $einfo;
    }

    private function dbUpdata($data, $jg) {
        $keyArr = explode(',', $data['keywords']);

        foreach ($keyArr as $k => $v) {
            $todayinfo = M('report')->where("s_id = '".$data['id']."' AND key_name = '".$v."'  AND (DAY(FROM_UNIXTIME(time, '%Y%m%d'))= DAY(now()))")->find();
            if($todayinfo) {
                $todayinfo['rank'] = $jg['keywords'][$v];
                $todayinfo['time'] = time();
                M('report')->save($todayinfo);
            }else {
                 $todayinfo['rank'] = $jg['keywords'][$v];
                 $todayinfo['time'] = time();
                 $todayinfo['s_id'] = $data['id'];
                 $todayinfo['key_name'] = $v;
                 M('report')->add($todayinfo);
            }
        }
    }

}