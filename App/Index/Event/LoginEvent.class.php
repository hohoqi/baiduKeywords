<?php
namespace Index\Event;
class LoginEvent {
    public function login() {
        $username = I('username','','trim');
        $password = I('password','');

        $info['status'] = 1;
        $info['title'] = '登陆成功';
        $info['mess'] = '恭喜你, 登陆成功';

        if ($username == '' || $password == '') {
            $info['title'] = '登陆失败';
            $info['mess'] = '对不起,账号或密码不能为空';
            $info['status'] = 2;
            return  $info;
        }

        $admin['username'] = C('USER.USER_NAME');
        $admin['password'] = C('USER.PASSWORD');
        $admin['encrypt'] = C('USER.ENCRYPT');

        import('Class.User', APP_PATH);
        $cUser = new \Wkd\User();
        
        if (!$admin || ($admin['password'] != $cUser->get_password($password, $admin['encrypt']))) {
            $info['title'] = '登陆失败';
            $info['mess'] = '对不起, 账号或密码错误';
            $info['status'] = 2;
            return  $info;
        }

        //保存Session
        session('USER_AUTH_KEY', C('USER_AUTH_KEY'));
        session('user', $admin['username']);

        $round = $cUser->get_randomstr(8);
        session('round', $round);

        $info['name'] = $admin['username'];
        $info['round'] = base64_encode($round);
        return  $info;
    }

    public function getUserStatus() {  
        if(session('USER_AUTH_KEY')) {
             $info['status'] = 1;

             $admin['username'] = C('USER.USER_NAME');
             import('Class.User', APP_PATH);
             $cUser = new \Wkd\User();

             //保存Session
             session('USER_AUTH_KEY', C('USER_AUTH_KEY'));
             session('user', $admin['username']);

             $round = $cUser->get_randomstr(8);
             session('round', $round);

             $info['name'] = $admin['username'];
             $info['round'] = base64_encode($round);
             return  $info;
        }else {
           $info['title'] = '登录失效';
           $info['mess'] = '对不起,登录信息已失效,请重新登录';
           $info['status'] = 50099;
           return $info; 
        }

    }

    public function updata() {
        $username = I('post.name');
        $password = I('post.password');

        $info['status'] = 1;
        $info['title'] = '修改成功';
        $info['mess'] = '恭喜你,修改成功';

        if ($username == '' || $password == '') {
            $info['mess'] = '账号或密码不能为空';
            $info['status'] = 2;
            return  $info;
        }


        import('Class.User', APP_PATH);
        $cUser = new \Wkd\User();

        $psw = $cUser->get_password($password);

        $data['USER_NAME'] = $username;
        $data['PASSWORD'] = $psw['password'];
        $data['ENCRYPT'] = $psw['encrypt'];

        if($this->writeArr($data, MODULE_PATH.'conf/config.user.php')) {
            //保存Session
            session('USER_AUTH_KEY', null);
            session('user', null);
        }else {
            $info['title'] = '修改失败';
            $info['mess'] = '对不起,修改失败,请重试';
            $info['status'] = 2;
        }

        return $info;
    }

    public function writeArr($arr, $filename) {
            return file_put_contents($filename, "<?php\r\nreturn " . var_export($arr, true) . ";");
    }
}