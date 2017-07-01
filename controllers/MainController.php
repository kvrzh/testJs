<?php
/**
 * Created by PhpStorm.
 * User: anton4ik
 * Date: 27.06.2017
 * Time: 13:32
 */

namespace app\controllers;

use app\models\Posts;
use Yii;
use yii\web\Controller;

class MainController extends Controller
{
    public function actionIndex()
    {
        $posts = Posts::find()->all();
        return $this->render('index', compact('posts'));
    }

}