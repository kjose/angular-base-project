// In typescript you must declare the vars used (like jquery)
declare var $:any;

import { Component } from '@angular/core';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    // styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
}

// Run jquery code in controller or in a separate file
$(document).ready(function() {
    $('.action_open', '#sidebar_wrapper').click(function() {
        $('.ui.sidebar')
            .sidebar('toggle')
        ;
    });
});