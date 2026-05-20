$(document).on('pagecreate', '#mainPage', function () {

    function bindSwipes($task) {
        // Swipe gauche : supprimer la tache
        $task.on('swipeleft', function () {
            $task.slideUp(300, function () {
                $task.remove();
            });
        });

        
        $task.on('swiperight', function () {
            if ($task.parent().is('#pendingList')) {
                // De "En cours" vers "Terminees" : on barre
                $task.addClass('crossed');
                $('#doneList').append($task);
            } else {
                
                $task.removeClass('crossed');
                $('#pendingList').append($task);
            }
            $('#pendingList').listview('refresh');
            $('#doneList').listview('refresh');
        });
    }

    // Clic sur "Ajouter"
    $('#btnAdd').on('click', function () {
        var $input = $('#newTaskInput');
        var content = $.trim($input.val());

        if (content === '') {
            $input.focus();
            return;
        }

        var $newTask = $('<li>').text(content);
        $('#pendingList').append($newTask);
        bindSwipes($newTask);
        $('#pendingList').listview('refresh');

        $input.val('').focus();
    });

    // Touche "Entree" dans le champ
    $('#newTaskInput').on('keypress', function (e) {
        if (e.which === 13) {
            $('#btnAdd').trigger('click');
        }
    });

    // Clic sur "Reinitialiser"
    $('#btnReset').on('click', function () {
        $('#pendingList').empty().listview('refresh');
        $('#doneList').empty().listview('refresh');
        $('#newTaskInput').val('').focus();
    });

});
