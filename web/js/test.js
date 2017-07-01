var TableApp = (function () {

    var ajax = function (url, data) {
        return new Promise(function (succeed, fail) {
            var xhr = new XMLHttpRequest();
            data = JSON.stringify(data);
            url = url + '?post=' + data;
            xhr.open('GET', url, true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.addEventListener("load", function () {
                if (xhr.status < 400)
                    succeed(xhr.responseText);
                else
                    fail(new Error("Request failed"));
            });
            xhr.addEventListener("error", function () {
                fail(new Error("Network error"));
            });
            xhr.send();
        })
    };
    return {
        init: function () {
            this.event();
        },
        event: function () {
            var table = document.querySelector('table');
            var self = this;
            table.addEventListener("click", function (e) {
                var target = e.target;
                if (target.classList[1]) {
                    var targetClass = target.classList[1];
                    switch (targetClass) {
                        case 'btn-success':
                            self.accept(target);
                            break;
                        case 'btn-primary':
                            self.edit(target);
                            break;
                        case 'btn-danger':
                            self.delete(target);
                            break;
                    }
                }
            });
            var addButton = document.querySelector('button');
            this.add(addButton);
        },
        edit: function (target) {
            var parent = target.parentNode.parentNode;
            var name = parent.querySelector('.name');
            var text = parent.querySelector('.text');
            var nameValue = name.innerHTML;
            var textValue = text.innerHTML;
            if (!name.children[0]) {
                name.innerHTML = '';
                text.innerHTML = '';
                target.disabled = 'disabled';
                var input = document.createElement('input');
                var textarea = document.createElement('textarea');
                input.name = 'name';
                input.type = 'text';
                input.value = nameValue;
                textarea.innerHTML = textValue;
                textarea.name = 'text';
                textarea.rows = 5;
                name.appendChild(input);
                text.appendChild(textarea);
            }
        },
        delete: function (target) {
            var parent = target.parentNode.parentNode;
            var id = parent.querySelector('td.id').innerHTML;
            var post = {
                id: id
            };
            var url = '/post/delete';
            if (post.id == '') {
                parent.remove();
            } else {
                ajax(url, post).then(function (text) {
                    parent.remove();
                }, function (error) {
                    console.log(error);
                });
            }
        },
        accept: function (target) {
            var parent = target.parentNode.parentNode;
            var id = parent.querySelector('td.id').innerHTML;
            if (id == '') {
                id = 0;
            }
            if (parent.querySelector('td.name').children[0]) {
                var name = parent.querySelector('td.name input').value;
                var texts = parent.querySelector('td.text textarea').value;
                var post = {
                    id: id,
                    name: name,
                    text: texts
                };
                var url = '/post/update';
                ajax(url, post).then(function (text) {
                    parent.querySelector('td.name input').remove();
                    parent.querySelector('td.text textarea').remove();
                    parent.querySelector('td.name').innerHTML = name;
                    parent.querySelector('td.text').innerHTML = texts;
                    parent.querySelector('td.id').innerHTML = text;
                    parent.querySelector('td.functions .btn-primary').disabled = false;
                }, function (error) {
                    console.log(error);
                });
            }
        },
        add: function (button) {
            button.addEventListener("click", function () {
                var parent = document.querySelector('tbody');
                var tr = parent.lastElementChild;
                var newTr = tr.cloneNode(true);
                newTr.querySelector('td.id').innerHTML = '';
                newTr.querySelector('td.name').innerHTML = '<input type="text" name="name">';
                newTr.querySelector('td.text').innerHTML = '<textarea name="text" rows="5" id="text"></textarea>';
                newTr.querySelector('td.functions .btn-primary').disabled = 'disabled';
                parent.appendChild(newTr);
            });
        }
    }
})();
TableApp.init();

