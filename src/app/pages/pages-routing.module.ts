import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminGuardGuard } from "../services/admin-guard.guard";
import { JCentroGuardGuard } from "../services/jCentro-guard.guard";
import { LoginGuardGuard } from "../services/login-guard.guard";
import { UserGuardGuard } from "../services/user-guard.guard";

import { AddcentroComponent } from "./centros/addcentro/addcentro.component";
import { CentroComponent } from "./centros/centro.component";
import { CentrosComponent } from "./centros/centros.component";
import { EditcentroComponent } from "./centros/editcentro/editcentro.component";
import { AddempresaComponent } from "./empresas/addempresa/addempresa.component";
import { EditempresaComponent } from "./empresas/editempresa/editempresa.component";
import { EmpresaComponent } from "./empresas/empresa.component";
import { EmpresasComponent } from "./empresas/empresas.component";
import { AddestacionComponent } from "./estaciones/addestacion/addestacion.component";
import { EditestacionComponent } from "./estaciones/editestacion/editestacion.component";
import { EstacionComponent } from "./estaciones/estacion.component";
import { EstacionesComponent } from "./estaciones/estaciones.component";
import { GraficoD3Component } from "./estaciones/grafico-d3/grafico-d3.component";
import { AddgenpackComponent } from "./genpacks/addgenpack/addgenpack.component";
import { EditgenpackComponent } from "./genpacks/editgenpack/editgenpack.component";
import { GenpackComponent } from "./genpacks/genpack.component";
import { GenpacksComponent } from "./genpacks/genpacks.component";
import { NoPageFoundComponent } from "./no-page-found/no-page-found.component";
import { PagesComponent } from "./pages.component";
import { RadarComponent } from "./radares/radar.component";
import { AddusuarioComponent } from "./usuarios/addusuario/addusuario.component";
import { EditusuarioComponent } from "./usuarios/editusuario/editusuario.component";
import { PasswordComponent } from "./usuarios/password/password.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";
import { WelcomeComponent } from "./welcome.component";

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        children: [
            {path: '', pathMatch: 'full', redirectTo: '/welcome'},
            {path: 'empresas', component:EmpresasComponent, canActivate:[AdminGuardGuard]},//empresas
            {path: 'empresa/:id', component:EmpresaComponent, canActivate:[AdminGuardGuard]},
            {path: 'addEmpresa', component:AddempresaComponent, canActivate:[AdminGuardGuard]},
            {path: 'editEmpresa/:id', component:EditempresaComponent, canActivate:[AdminGuardGuard]},
            {path: 'estaciones', component:EstacionesComponent, canActivate:[UserGuardGuard]},//estaciones
            {path: 'estacion/:id', component:EstacionComponent, canActivate:[LoginGuardGuard]},
            {path: 'addEstacion', component:AddestacionComponent, canActivate:[AdminGuardGuard]},
            {path: 'editEstacion/:id', component:EditestacionComponent, canActivate:[JCentroGuardGuard]},
            {path: 'centros', component:CentrosComponent, canActivate:[LoginGuardGuard]},//centros
            {path: 'centro/:id', component:CentroComponent, canActivate:[LoginGuardGuard]},
            {path: 'addCentro', component:AddcentroComponent, canActivate:[UserGuardGuard]},
            {path: 'editCentro/:id', component:EditcentroComponent, canActivate:[UserGuardGuard]},
            {path: 'usuarios', component:UsuariosComponent, canActivate:[UserGuardGuard]},//usuarios
            {path: 'addUser', component:AddusuarioComponent, canActivate:[UserGuardGuard]},
            {path: 'editUser/:id', component:EditusuarioComponent, canActivate:[LoginGuardGuard]},
            {path: 'password', component:PasswordComponent, canActivate:[LoginGuardGuard]},
            {path: 'welcome', component:WelcomeComponent, canActivate:[LoginGuardGuard]},
            {path: 'genpacks', component:GenpacksComponent, canActivate:[UserGuardGuard]},
            {path: 'genpack/:id', component:GenpackComponent, canActivate:[LoginGuardGuard]},
            {path: 'addGenpack', component:AddgenpackComponent, canActivate:[AdminGuardGuard]},
            {path: 'editGenpack/:id', component:EditgenpackComponent, canActivate:[AdminGuardGuard]},
            {path: 'radar', component:RadarComponent, canActivate:[AdminGuardGuard]},
            {path: '404', component: NoPageFoundComponent },
            {path: '**', redirectTo: '/404'}
        ]
    }
]

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);