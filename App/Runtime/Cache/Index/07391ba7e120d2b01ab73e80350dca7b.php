<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="renderer" content="webkit">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
    <title>关键词查看</title>

    <!-- Bootstrap -->
    <link href="/Template/Static/Index/Css/bootstrap3/bootstrap.min.css" rel="stylesheet">
    
    <link href="/Template/Static/Index/Css/public/font-awesome.css" rel="stylesheet">
    <link href="/Template/Static/Index/Css/style.css" rel="stylesheet">
    <link href="/Template/Static/Index/Css/public/function.css" rel="stylesheet">

      <!--[if lte IE 6]>
        <link rel="stylesheet" type="text/css" href="/Template/Static/Index/Css/bootstrap3/bootstrap-ie6.min.css">
        <link rel="stylesheet" type="text/css" href="css/bootstrap3/ie.css">
      <![endif]-->

    <!--[if lt IE 9]>
      <script src="/Template/Static/Index/Js/model/html5shiv.min.js"></script>
      <script src="/Template/Static/Index/Js/model/respond.min.js"></script>
    <![endif]-->
  </head>
  <body class="bg-default">
     <div class="content container-fluid col-md-12 col-sm-12 col-xs-12">
          <div class="alert alert-info margin-top15" role="alert">尊敬的用户您好， 这是您的站点目前具有的关键词的排名</div>

          <div class="panel panel-default">
            <!-- Default panel contents -->
            <div class="panel-heading">关键词的排名</div>

            <!-- Table -->
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>序号</th>
                  <th>关键词/积分</th>
                  <th>更新时间</th>
                </tr>
              </thead>
              <tbody>
               <?php if(is_array($infolist)): foreach($infolist as $key=>$v): ?><tr>
                  <th scope="row"><?php echo ($key+1); ?></th>
                  <td class="text-danger"><?php if(is_array($v)): foreach($v as $key=>$v2): ?>&nbsp;&nbsp;<?php echo ($v2["key_name"]); ?> : <?php echo ($v2["rank"]); ?>&nbsp;&nbsp;<?php endforeach; endif; ?></td>
                  <td><?php echo (date('Y-m-d H:i:s',$v[0]['time'])); ?></td>
                </tr><?php endforeach; endif; ?>
              </tbody>
            </table>
          </div>

          <?php echo ($page); ?>

     </div>
   </div>
	


	<!-- JS 文件引入 -->
    <script src="/Template/Static/Index/Js/model/jquery-1.11.3.min.js"></script>
    <script src="/Template/Static/Index/Js/bootstrap3/bootstrap.min.js"></script>
    <script src="/Template/Static/Index/Js/app.js"></script>
    <!--[if lte IE 6]>
      <script type="text/javascript" src="/Template/Static/Index/Js/bootstrap3/bootstrap-ie.js"></script>
    <![endif]-->
  </body>
</html>