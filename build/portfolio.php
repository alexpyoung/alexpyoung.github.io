<?php 

require_once '../config.php';
require_once PARTIALS_PATH.'/_header.php'; 

?>

<div class="container">
    <h2>Web Development</h2>
    <div class="item-list">
        <?php 
            require TEMPLATES_PATH.'/items.php';
            Mustache_Autoloader::register();

            $items = 3;
            $mustache = new Mustache_Engine(array(
                'loader' => new Mustache_Loader_FilesystemLoader(dirname(__FILE__).'/templates'),
            ));
            for($i = 0; $i < $items; $i++) {
                echo $mustache->render('item', $projects[$i]);
            }
        ?>
    </div>
    <h2>Programming</h2>
    <div class="item-list">
        <?php 
            for($i = $items, $num = sizeof($projects); $i < $num; $i++) {
                echo $mustache->render('item', $projects[$i]);
            }
        ?>
    </div>
</div>
<div class="container-fluid container-alt">
    <div class="container">
        <?php
            $button = new Button_Orange("contact.php", "Contact Me");
            echo $mustache->render('button', $button);
        ?>
    </div>
</div>

<?php require PARTIALS_PATH.'/_footer.php'; ?>