<?php
namespace Index\Controller;
use Think\Controller;
class LoginController extends Controller {
    public function index(){
        if (IS_POST) {
            $event = A('Login','Event');
            $einfo = $event->login();
            $this->ajaxReturn($einfo);
            exit();
        }
    }

    public function getUserStatus(){
        if (IS_POST) {
            $event = A('Login','Event');
            $einfo = $event->getUserStatus();
            $this->ajaxReturn($einfo);
            exit();
        }
    }
    public function clear() {
        session('USER_AUTH_KEY', null);
    }

    public function out() {
        session('USER_AUTH_KEY', null);
        session('user', null);
        $data = array(
            'status' => 1,
            'mess' => '退出登录成功'
        );
        if(!session('USER_AUTH_KEY')) {
             $this->ajaxReturn($data);
        }
    }
    public function getUser() {
        $username = I('post.username');
        $user = explode(session('round'), base64_decode($username));
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


        $admin['name'] = C('USER.USER_NAME');
        $this->ajaxReturn($admin);
    }
    public function updata() {
        $username = I('post.username');
        $user = explode(session('round'), base64_decode($username));
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

        if(IS_POST) {
            $event = A('Login','Event');
            $einfo = $event->updata();

            $this->ajaxReturn($einfo);
            exit();
        }
    }

}