import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { UserService } from 'src/app/Services/User.service';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    private toggleButton: any;
    private sidebarVisible: boolean;

    constructor(public location: Location, private element: ElementRef, _userService: UserService,readonly router: Router) {
        this.sidebarVisible = false;
    }

    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    }
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };
    sidebarToggle() {
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };

    getUser() {
        return UserService._user;
    }

    canGo(loc: string) {


        if (UserService._user != null) {

            if (UserService._user.type === 'Admin')
                return true
            if (loc === 'home')
                return true
            if (loc === 'manage user')
                return false
            if (loc === 'Client Projects' && UserService._user.type === 'Rapporteur')
                return true
            if (loc === 'Project status' && UserService._user.type === 'Dev')
                return true
        }

        return false;
    }

    removeSessionUser(){
        UserService.removeUserSession()
        this.router.navigate(['/Authentification'])
      }
}
