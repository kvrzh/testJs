<?php

namespace app\controllers;

use Yii;
use app\models\Posts;

class PostController extends \yii\web\Controller
{
    public function actionGet(){
        print_r($_GET);
     }

    public function actionDelete(){
        if(Yii::$app->request->get()['post']){
            $post = json_decode(Yii::$app->request->get()['post']);
            Posts::findOne($post->id)->delete();
        }
    }

    public function actionUpdate(){
        if(Yii::$app->request->get()['post']) {
            $post = json_decode(Yii::$app->request->get()['post']);
            if($post->id != 0){
                $model = Posts::findOne($post->id);
                $model->text = $post->text;
                $model->name = $post->name;
                $model->save();
                echo $model->id;
            }else{
                $model = new Posts();
                $model->text = $post->text;
                $model->name = $post->name;
                $model->save();
                echo Yii::$app->db->lastInsertID;
            }
        }
    }
    
}
