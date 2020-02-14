---
title: Laravel学习手记
date: 2017-10-18 17:41:31
tags: [laravel, php]
---
安装Laravel的Homestead开发环境
请参考 [Windows下搭建Laravel的Homestead开发环境](https://bigma.cc/2017/08/08/Homestead/)

# 搭建本地环境

1.下载安装

Study
2.下载安装composer
3.下载 [最新版Laravel框架](https://github.com/laravel/laravel/archive/master.zip)
4.解压到网站目录 这里统一命名为laravel
5.phpStudy 添加一个网站 laravel.app 路径指向你网站目录的 laravel\public 下
6.本地Host 文件添加一行 laravel.app 127.0.0.1
7.网站目录下的 laravel\.env.example 文件复制改名 .env
> tips: windows下是无法创建改.env文件的，可以在vscode中创建，一定要创建啊，要不然打开会报500 错误

8.将以下内容添加到 composer.json 文件中 请参考 https://pkg.phpcomposer.com/ 这样就能使用中国的composer镜像了。

```bash
"repositories": {
    "packagist": {
        "type": "composer",
        "url": "https://packagist.phpcomposer.com"
    }
}
```
9.在根目录执行 composer install 等待安装完成
10.打开浏览器输入 laravel.app 

如果出现 `The only supported ciphers are AES-128-CBC and AES-256-CBC with the correct key lengths.`的错误
请在网站目录中执行以下命令
```bash
$ php artisan key:generate
```
11.在 Nginx 配置文件中加入  不加会导致请求api的时候404
```bash
location / {
    try_files $uri $uri/ /index.php?$query_string;
}
```
# 数据库配置
laravel/.env
```bash
DB_CONNECTION=mysql   #数据库类型
DB_HOST=127.0.0.1     #数据库地址
DB_PORT=3306          #端口
DB_DATABASE=homestead #数据库名
DB_USERNAME=homestead #数据库用户名
DB_PASSWORD=secret    #数据库密码
```

# 路由
laravel\routes\web.php
```php
//请求 /user 路径，访问 UserController 控制器中的 index 方法
Route::get('/user', 'UserController@index');
```
#### 路由参数
当然，有时需要在路由中捕获一些 URL 片段。例如，从 URL 中捕获用户的 ID，可以通过定义路由参数来执行此操作：
```php
Route::get('user/{id}', function ($id) {
    return 'User '.$id;
});
```
也可以根据需要在路由中定义多个参数：
```php
Route::get('posts/{post}/comments/{comment}', function ($postId, $commentId) {
    //
});
```
**可选参数**
有时，你可能需要指定一个路由参数，但你希望这个参数是可选的。你可以在参数后面加上 ? 标记来实现，但前提是要确保路由的相应变量有默认值：
```php
Route::get('user/{name?}', function ($name = null) {
    return $name;
});

Route::get('user/{name?}', function ($name = 'John') {
    return $name;
});

//需在控制器对应的方法中接收参数
Route::get('/user/{name?}', 'UserController@index');
//控制器中的方法
public function index($name){
 some code...
}
```

#### 路由组
**路由前缀**
可以用 prefix 方法为路由组中给定的 URL 增加前缀。例如，你可以为组中所有路由的 URI 加上 admin 前缀：
```php
Route::prefix('admin')->group(function () {
    Route::get('users', function () {
        // 匹配包含 "/admin/users" 的 URL
    });
});
```

**命名空间**
另一个常见用例是使用 namespace 方法将相同的 PHP 命名空间分配给路由组的中所有的控制器：

```php
Route::namespace('Admin')->group(function(){
    Route::get('test', 'TController@test');
});
```
在 App\Http\Controllers 新建一个文件夹 Admin 其下新建一个 TConroller.php
 TConroller.php 内容
 ```php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
class TController extends Controller{
    public function test(){
        return "命名空间路由测试";
    }
}
 ```
#### any
如何页面是一个表单，既需要展示有需要post数据，可以使用 any
```php
Route::any('admin/cate/edit/{id}', 'Admin\CateController@update');
```
在控制器中需要先判断是 get 还是 post 来执行不同的命令
```php
public function update(Request $request, $id)
{
    if ($request->isMethod('get')) { //判断 Method 方式
        $row = CateModel::where(['id'=>$id])->first()->toArray();
        $cate = CateModel::tree();
        return view('admin.cate.edit', ['row' => $row, 'cateRow'=>$cate]);
    } else {
        $data = $request->except('_token');
        CateModel::where(['id'=>$id])->update($data);
        return redirect('admin/cate/list');
    }
}
```

请记住，默认情况下，RouteServiceProvider 会在命名空间组中引入你的路由文件，让你不用指定完整的 App\Http\Controllers 命名空间前缀就能注册控制器路由。因此，你只需要指定命名空间 App\Http\Controllers 之后的部分。

路由的其他使用方法 https://d.laravel-china.org/docs/5.5/routing

# 控制器
1.控制器定义在 laravel\app\Http\Controllers\ 下
2.使用命名空间，注意命名空间大小写，首字母大写 namespace App\Http\Controllers;
3.定义的控制器类必须继承基础控制器 Controller
4.必须先定义好路由
新建 UserController.php 控制器文件 类名需与文件名保持一致
```php
namespace App\Http\Controllers;
use DB;
class UserController extends Controller
{
    public function index(){
        $sql = 'select * from user';
        $rows = DB::select($sql);
        // DD($rows);
        // return "Hello";
        return view('list', ['rows'=>$rows]);
    }
}
```
使用 view('list', ['rows'=>$rows]) 调用 list 视图 通过数组传参 
使用 dd($rows) 来打印数据
使用 DB来访问数据库控制方法

# 重定向
重定向响应是类 Illuminate\Http\RedirectResponse 的实例, 包含了重定向用户到其他 URL 所需要的合适头信息。有很多方式生成 RedirectResponse 实例。最简单的方法是使用全局的 redirect 辅助函数：
```php
Route::get('dashboard', function () {
    return redirect('home/dashboard');
    //重定向到本地
    return redirect('/student');
    //跨域重定向
    return redirect('http://www.baidu.com');
    //使用门面类调转 不推荐使用
    return Redirect::to('/student');
});
```

**重定向到控制器**
```php
return redirect()->action('HomeController@index');
//传递参数
return redirect()->action(
    'UserController@profile', ['id' => 1]
);

```
**注意** 使用 action 方法跳转到控制器对应的方法，需要事先在路由中注册该方法

# response
#### 返回 json 数据
**
1.必须使用 response() 函数
2.必须使用 return 返回
**

```php
namespace App\Http\Controllers;

class ResponseController extends Controller
{
    public function rj(){
        $data = ["name" => "laowang" , "age" => 18];
        return response()->json($data);
    }
}
```

#### 下载
```php
public function down(){
        return response()->download("D:/phpStudy/WWW/laravel/public/avatar.jpg");
    }
```
# request

$request->method() 获取当前 http 请求的方法
$request->isMethod("get") 判断当前 http 请求的方法是否为 get
$request->url() 返回当前的url 不包括参数 使用 $request->参数 可获取到参数的值
$request->all() 获取post提交的表单数据 提交表单必须添加token ```<input type="hidden" name="_token" value="<?php echo csrf_token() ?>">```
$request->input("参数/表单元素名") 单独获取表单中元素名的值
```php
<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RequestController extends Controller
{
    public function req(Request  $request){
        dd($request->id);
    }

    public function add(Request  $request){
        dd($request->all());
    }
}
```
Tips:
1.使用 Request 类之前，必须 use 载入该类 use Illuminate\Http\Request;
2.函数中，使用 Request 类名约束形式参数

# 使用命令行创建控制器
在 laravel 目录下执行
```bash
# 可显示 help 信息
$ D:/phpStudy/php70n/php.exe artisan

# 创建控制器
$ D:/phpStudy/php70n/php.exe artisan make:controller PhotoController
```

# Restfull 风格控制器
创建控制器
```bash
# 创建 restfull 风格控制器 （将PHP.exe加入环境变量则可以直接使用 php artisan）
$ php artisan make:controller TestController --resource
```
使用专用路由
```php
Route::resource('photo','PhotoController');
```
使用一下命令查看路由表
```bash
$ php artisan route:list

+--------+-----------+--------------------+---------------+----------------------------------------------+--------------+
| Domain | Method    | URI                | Name          | Action                                       | Middleware   |
+--------+-----------+--------------------+---------------+----------------------------------------------+--------------+
|        | GET|HEAD  | photo              | photo.index   | App\Http\Controllers\PhotoController@index   | web          |
|        | POST      | photo              | photo.store   | App\Http\Controllers\PhotoController@store   | web          |
|        | GET|HEAD  | photo/create       | photo.create  | App\Http\Controllers\PhotoController@create  | web          |
|        | GET|HEAD  | photo/{photo}      | photo.show    | App\Http\Controllers\PhotoController@show    | web          |
|        | PUT|PATCH | photo/{photo}      | photo.update  | App\Http\Controllers\PhotoController@update  | web          |
|        | DELETE    | photo/{photo}      | photo.destroy | App\Http\Controllers\PhotoController@destroy | web          |
|        | GET|HEAD  | photo/{photo}/edit | photo.edit    | App\Http\Controllers\PhotoController@edit    | web          |
+--------+-----------+--------------------+---------------+----------------------------------------------+--------------+

```
# 视图
视图新建在 resources/views/ 目录下，为PHP文件
使用 view("视图文件名", ["参数名"=> "参数值"]) 调用视图文件。多级目录使用 folder.folder.viewname 的形式
```php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
class ShowController extends Controller
{
    public function show(){
        return view('test.show', ['name'=>'Hello']);
    }
    
}
```
#### 使用DB调用数据
先配置好数据库连接
新建 list.php 视图文件 通过 echo $rows 显示数据
```php
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <table>
        <tr>
            <td>id</td>
            <td>姓名</td>
            <td>年龄</td>
        </tr>
        <?php foreach($rows as $row){ ?>
        <tr>
            <td><?php echo $row->id; ?></td>
            <td><?php echo $row->user; ?></td>
            <td><?php echo $row->age; ?></td>
        </tr>
        <?php } ?>
    </table>
</body>
</html>
```
控制器文件
```php
<?php
namespace App\Http\Controllers;
use DB;
class UserController extends Controller
{
    public function index(){
        $sql = 'select * from user';
        $rows = DB::select($sql);
        // DD($rows);
        // return "Hello";
        return view('list', ['rows'=>$rows]);
    }
}
```
#### blade模版
在 resources/views/ 目录下新建 viewname.blade.php 的 blade 模版
**变量输出**
``` {{$name}} ```
**执行函数**
可执行 PHP 和 Laravel 函数
``` {{print_r($name)}} ```
**三元表达式**
``` {{isset($name) ? $name : 'Default'}} ```
blade 模版的三元表达式
{{$name or 'Default'}}
**输出原始数据（不转义HTML）**
{!!$name!!}
**循环语句**
```php
@for ($i = 0; $i < 10; $i++)
    目前的值为 {{ $i }}
@endfor

@foreach ($users as $user)
    <p>此用户为 {{ $user->id }}</p>
@endforeach
```
https://d.laravel-china.org/docs/5.5/blade#loops

**if语句**
```php
@if (count($records) === 1)
    我有一条记录！
@elseif (count($records) > 1)
    我有多条记录！
@else
    我没有任何记录！
@endif
```

https://d.laravel-china.org/docs/5.5/blade#if-statements

**区块划分语句**
```php
//创建 top 区块 并立即显示
@section("top")
somecode
@show

//只创建 top 区块
@section("top")
somecode
@endsection

//引用 top 区块
@yield("top")
```
**继承模版**
```php
@extends("template.master")
```
**component 组件使用**
定义组件
新建一个 component1.blade.php 文件
```php
<div class='component'>
    <!-- $title，$content 变量实际上就是预定义的插槽 -->
    <div class='title'>{{ $title }}</div>
    <div class='content'>{{ $content }}</div>
</div>
```
使用组件
@slot 传递变量
```php
@component('blade.component1') //括号中为组件的路径
    @slot('title')
        组件标题 //为组件中的 {{$title}} 传值
    @endslot
    
    @slot('content')
        组件内容
    @endslot
@endcomponent
```
渲染JSON内容
```php
var app = @json($array);
```
输出存在的变量
```php
//有时候你想要输出一个变量，但是不确定该变量是否被设置，我们可以通过如下 PHP 代码：
{ isset($name) ? $name : 'Default' }}
// 除了使用三元运算符，Blade 还提供了更简单的方式： 如果 $name 变量存在，其值将会显示，否则将会显示 Default。
{{ $name or 'Default' }}
```
Blade & JavaScript 框架
Vue也使用双花括号，所以使用 @ 符号来告诉 Blade 渲染引擎该表达式应该保持原生格式不作改动，使Vue能正确渲染
```php
<h1>Laravel</h1>
Hello, @{{ name }}.

//使用 verbatim 此块中的代码不会被blade渲染。
@verbatim
    <div class="container">
        Hello, {{ name }}.
    </div>
@endverbatim
```

认证指令
```php
//@auth 和 @guest 指令可用于快速判断当前用户是否登录：

@auth
    // 用户已登录...
@endauth

@guest
    // 用户未登录...
@endguest
//如果需要的话，你也可以在使用 @auth 和 @guest 的时候指定登录用户类型：

@auth('admin')
    // The user is authenticated...
@endauth

@guest('admin')
    // The user is not authenticated...
@endguest
```
注释

Blade 还允许你在视图中定义注释，然而，不同于 HTML 注释，Blade 注释并不会包含到 HTML 中被返回：
```php
{{-- This comment will not be present in the rendered HTML --}}
```
PHP

在一些场景中，嵌入 PHP 代码到视图中很有用，你可以使用 @php 指令在模板中执行一段原生 PHP 代码：
```php
@php
    //
@endphp
```
# 模型
模型用来对数据库进行操作。
创建 Model
```bash
$ php artisan make:model Models/UserModel
```
UserModel 将创建在 laravel/app/Models 目录下
**Tips**
1. namespace 每个目录名大写
2. 使用基础模型类 use Illuminate\Database\Eloquent\Model;
3. 需要使用成员属性 $table 指定表名
4. 如果该表的主键非 id ，需要使用 $primaryKey 指定该表的主键 

```php
//UserModel.php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class UserModel extends Model
{
    protected $table="admin";
}
```
#### 查询数据
新建控制器 UserController.php
```php
namespace App\Http\Controllers;
use App\Models\UserModel;
class UserController extends Controller
{
    public function select(){
    	//查询所有数据
        $row = UserModel::all();   
        dd($row);
        //使用 get()->toArray() 将查询的数据集转换成数组
        $row = UserModel::get() ->toArray();
        dd($row);
        
        //where 进行条件查询 first() 表示取出第一天数据
        $user = UserModel::where('user', '老王')->first();
        dd($user);
        //使用 $user->id 取出成员id
        dd($user->id);
        
        //使用 value 函数直接取出值
        $user = UserModel::where('user', '老王')->value('id');
        dd($user);
        
        //选择字段取值
        $user = UserModel::where('user', '老王')->select('user', 'age')->get()->toArray();
        dd($user);
    }
}
```
**插入数据**
Tips
1.Laravel 默认的插入方式需要表中有 updated_at 和 created_at 字段（timestamp类型） 用来保存更新和创建时间。关闭方法为在 Model 中添加 ``` public $timestamps = false; ```
2.使用数组形式插入数据需要在 Model 中定义哪些字段可以插入 ```php protected $fillable = ['user', 'age']; ```

```php
public function insert(){
		//单条插入
        $user = new UserModel();
        $user->user = "老马";
        $user->age = "16";
        $user->save();

        dd($user->id);
        
        //数组插入
        $user->fill(['user'=>"小马", "age" => 16]);
        $user->save();
        
        //一次插入多条数据
        UserModel::insert([
            ['user'=>"小马2", "age" => 16],
            ['user'=>"小马3", "age" => 16],
            ['user'=>"小马4", "age" => 16],
            ['user'=>"小马5", "age" => 16],
            ['user'=>"小马6", "age" => 16]
        ]);

    }
```
**更新数据**
```php
public function update(){
        //更新数据
        $user = UserModel::where(['id'=>'1'])->first();
        $user->user = "老李";
        $user->save();

        //更新形式2
        UserModel::where(['id'=>'1'])->update(['user'=>'老毛桃']);
    }
```
**删除数据**
```php
public function delete(){
        UserModel::where(['id'=>'2'])->delete();
    }
```
**一对一查询**
```php
//ArticleModel
public function Cate(){
    //id 表示分类表中的 id 字段 ，cate 表示文章表中的 cate 字段
    //使用文章表中的 cate 字段 查出 对应分类表id 字段的数据
    return $this->hasOne('App\Models\Admin\CateModel', 'id', 'cate');
}
//ArticleModel
public function getlist()
    {
        $rows = ArticleModel::get();
        //dd($row[0]->Cate->name);//取出name值
        return view('admin.list', ['rows' => $rows]);
    }

```
View 模版
```php
@foreach($rows as $row)
                <tr>
                <th scope="row">{{$row->id}}</th>
                <td>{{$row->title}}</td>
                <td>{{$row->Cate->name}}</td>
                <td><a href="/admin/article/edit/{{$row['id']}}"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></a> | <span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span></td>
                </tr>
@endforeach

```

**一对多查询**
```php
//CateModel

public function Articles(){
        //在分类模型中 使用一对多 通过传入的分类 id 匹配 ArticleModel 的 cate 字段 获取多篇文章
        return $this->hasMany('App\Models\Admin\ArticleModel', 'cate', 'id');
    }

//CateController
public function show($id)
    {
        //使用 分类 查出多条文章 一对多查询 
        $cate = CateModel::find($id) -> Articles() ->get() -> toArray();
        dd($cate);
    }

```
**基本分页**
```php
//$rows = ArticleModel::get();
//基本分页
$rows = ArticleModel::simplePaginate(2);
//带页码分页
$rows = ArticleModel::Paginate(2);
//模版
 {!! $rows->render()!!}
```

# 静态资源
在 blade 模版中使用 ```{{asset("css.css")}}``` 可引用 public 目录下的文件。
使用 Hash::check('明文', '密文');

# Session
#### 一次性Session
```php
$request->session()->flash('message', '账号密码错误');
```
# Hash
```php
使用 Hash 需要先引用
use Illuminate\Support\Facades\Hash;

//加密
Hash::make($password)]
//对比
Hash::check($password, $user->password)
```
