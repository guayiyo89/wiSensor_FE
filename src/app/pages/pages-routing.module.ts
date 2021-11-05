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
import { AddgenpackComponent } from "./genpacks/addgenpack/addgenpack.component";
import { EditgenpackComponent } from "./genpacks/editgenpack/editgenpack.component";
import { GenpackComponent } from "./genpacks/genpack.component";
import { GenpacksComponent } from "./genpacks/genpacks.component";
import { AddincidenteComponent } from "./incidentes/addincidente/addincidente.component";
import { EditincidenteComponent } from "./incidentes/editincidente/editincidente.component";
import { IncidentesComponent } from "./incidentes/incidentes.component";
import { NoPageFoundComponent } from "./no-page-found/no-page-found.component";
import { PagesComponent } from "./pages.component";
import { AddRadarComponent } from "./radares/add-radar/add-radar.component";
import { EditRadarComponent } from "./radares/edit-radar/edit-radar.component";
import { RadarComponent } from "./radares/radar.component";
import { RadaresComponent } from "./radares/radares.component";
import { AddusuarioComponent } from "./usuarios/addusuario/addusuario.component";
import { EditusuarioComponent } from "./usuarios/editusuario/editusuario.component";
import { PasswordComponent } from "./usuarios/password/password.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";
import { ConfComponent } from "./conf/conf.component";
import { WelcomeComponent } from "./welcome.component";
import { AlertasService } from "../services/alertas.service";
import { AlertasComponent } from "./estaciones/alertas/alertas.component";
import { AlertsComponent } from "./alerts/alerts.component";

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
            {path: 'genpacks', component:GenpacksComponent, canActivate:[UserGuardGuard]}, // genpacks
            {path: 'genpack/:id', component:GenpackComponent, canActivate:[LoginGuardGuard]},
            {path: 'addGenpack', component:AddgenpackComponent, canActivate:[AdminGuardGuard]},
            {path: 'editGenpack/:id', component:EditgenpackComponent, canActivate:[AdminGuardGuard]},
            {path: 'radares', component:RadaresComponent, canActivate:[AdminGuardGuard]}, // radares
            {path: 'radar/:id', component:RadarComponent, canActivate:[LoginGuardGuard]},
            {path: 'addRadar', component:AddRadarComponent, canActivate:[AdminGuardGuard]},
            {path: 'editRadar/:id', component:EditRadarComponent, canActivate:[AdminGuardGuard]},
            {path: 'incidentes', component:IncidentesComponent, canActivate:[LoginGuardGuard]},
            {path: 'configuracion', component:ConfComponent, canActivate:[LoginGuardGuard]},
            {path: 'addIncidente', component:AddincidenteComponent, canActivate:[JCentroGuardGuard]},
            {path: 'editIncidente/:id', component:EditincidenteComponent, canActivate:[LoginGuardGuard]},
            {path: 'alertas', component:AlertsComponent, canActivate:[LoginGuardGuard]},
            {path: '404', component: NoPageFoundComponent },
            {path: '**', redirectTo: '/404'}
        ]
    }
]

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
