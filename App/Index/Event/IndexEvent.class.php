<?php
namespace Index\Event;
class IndexEvent {
	public function getList() {
		return M('site')->select();
	}

	public function getSiteData($data) {
		//获取百度收录
        $info['bd_include'] = $this->getInclude($data);

        //获取PR
        if($data['is_pr'] == 1) {
        	$info['is_pr'] = 2;
        	$info['pr'] = (int)$this->getPr($data);
        }

        //获取百度权重
        $info['weight'] = $this->getWeight($data);

        //获取关键词排名
        $ranks = $this->getRank($data);

        $info['rank'] = $ranks['rank'];
        $info['keywords'] = $ranks['keywords'];

        return $info;
	}




	public function getRank($data) {
		$keyword = explode(',', $data['keywords']);
		//取得主域名
		$nameArr= explode('.', $data['url']);
		for($i = 1; $i < count($nameArr); $i++) {
			if($i == 1) {
				$name.=$nameArr[$i];
			}else {
				$name.='\.'.$nameArr[$i];
			}
		}
		
		//循环关键词 挨个获取
		$rank = array();
		$keywords = array();
		foreach ($keyword as $k => $v) {
			$pn = 0;
			$url = 'http://www.baidu.com/s?rn=50&wd='.$v;

			$jg = $this->getRankOnce($url, $pn, $name);
			$keywords[$v] = $jg;
			array_push($rank, $v .' : '. $jg);
		}

		$info['keywords'] = $keywords;

		$info['rank'] = implode(',  ', $rank);
		return $info;
	}

	private function getRankOnce($url, $pn, $name) {
		//拼接URL 字符
		$bdUrl = $url.'&pn='.$pn;
		//查询
		$html= file_get_contents($bdUrl);

		//正则
		preg_match_all('/(<span class="c-showurl">.*?<\/span>|<span class="g">.*?<\/span>)/ism', $html, $rankArr);

		//循环 求得位置
		foreach ($rankArr[0] as $k => $v) {
			$re = '/'.$name.'/';
			preg_match($re, strip_tags($v), $link);
			if($link && !$jg) {
				$jg = $k + 1;
			}
		}

		//如果位置存在 就返回
		if($jg) {
			return $jg + $pn;
		}else {  //否则 ,递归
			return '50+';

			//底下代码注释的 是 多页查询
			/*$p = $pn + 50;
			if($p == 100) {
				return '100+';
			}else {
				return $this->getRankOnce($url, $p, $name);
			}*/
		}
	}


	private function getInclude($data) {
		$url = 'http://www.baidu.com/s?wd=site:'.$data['url'];
		$html= file_get_contents($url);
        preg_match('/<b style=\"color:#333\">.*?<\/b>/', $html, $include);
        $info = $this->getNum(strip_tags($include[0]));
        return $info;
	}

	private function getPr($data) {
		$url = 'http://toolbarqueries.google.com.hk/tbr?client=navclient-auto&features=Rank&q=info:'.$data['url'].'&ch='.$this->HashURL($data['url']).'&gws_rd=cr';
        $prStr = file_get_contents($url);
        if($prStr) {
        	return substr($prStr, 9);
        }else {
        	return 0;
        }
	}

	private function getWeight($data) {
		$url = 'http://mytool.chinaz.com/baidusort.aspx?host='.$data['url'];
		$html = file_get_contents($url);
		preg_match('/<font color=\"blue\">.*?<\/font>/', $html, $weight);
		$info = $this->getNum(strip_tags($weight[0]));
		return $info;
	}

	//获取字符串中的数字
    private function getNum($str='') {
        $str=trim($str);
        $result='';
        for($i=0;$i<strlen($str);$i++){
            if(is_numeric($str[$i])){
                $result.=$str[$i];
            }
        }
        return $result;
    }

    //根据url 获取 hashurl  谷歌PR 用
    /*X86*/
    private function HashURL($url){ 
		$SEED = "Mining PageRank is AGAINST GOOGLE'S TERMS OF SERVICE. Yes, I'm talking to you, scammer."; 
		$Result = 0x01020345; 
		for ($i=0; $i<strlen($url); $i++) 
		{ 
		$Result ^= ord($SEED{$i%87}) ^ ord($url{$i}); 
		$Result = (($Result >> 23) & 0x1FF) | $Result << 9; 
		} 
		return sprintf("8%x", $Result); 
	} 
	/*X64*/
	/*private function HashURL($url)
	{
		$SEED = "Mining PageRank is AGAINST GOOGLE’S TERMS OF SERVICE.";
		$Result = 0x01020345;
		for ($i=0; $i<strlen($url); $i++) { 
			$Result ^= ord($SEED{$i%87}) ^ ord($url{$i}); 
			$Result = (($Result >> 23) & 0x1FF) | $Result << 9 & 0xFFFFFFFF;
		}
		return sprintf("8%x", $Result);
	}*/
}