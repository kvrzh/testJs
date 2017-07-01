<div role="main">
    <div class="container">
        <h1>Все записи</h1>
        <button class="btn btn-default">Добавить запись</button>
        <table class="table table-responsive">
            <tr>
                <th class="id">ID</th>
                <th class="name">Название записи</th>
                <th class="text">Текст записи</th>
                <th class="functions">Функции</th>
            </tr>
            <?php foreach ($posts as $post): ?>
            <tr>
                <td class="id"><?= $post->id ?></td>
                <td class="name"><?= $post->name ?></td>
                <td class="text"><?= $post->text ?></td>
                <td class="functions"><button class="btn btn-primary">Изменить</button>
                    <button class="btn btn-danger">Удалить</button>
                    <button class="btn btn-success">Применить изменения</button>
                </td>
            </tr>
            <?php endforeach; ?>
        </table>
    </div>
</div>