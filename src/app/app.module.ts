import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { PAGES_ROUTES } from './pages/pages-routing.module';

import { AppComponent } from './app.component';
import { EstacionesComponent } from './pages/estaciones/estaciones.component';
import { AddestacionComponent } from './pages/estaciones/addestacion/addestacion.component';
import { EditestacionComponent } from './pages/estaciones/editestacion/editestacion.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { AddempresaComponent } from './pages/empresas/addempresa/addempresa.component';
import { EditempresaComponent } from './pages/empresas/editempresa/editempresa.component';
import { LoginComponent } from './pages/login/login.component';
import { CentrosComponent } from './pages/centros/centros.component';
import { AddcentroComponent } from './pages/centros/addcentro/addcentro.component';
import { EditcentroComponent } from './pages/centros/editcentro/editcentro.component';
import { PagesComponent } from './pages/pages.component';
import { EmpresaComponent } from './pages/empresas/empresa.component';
import { EstacionComponent } from './pages/estaciones/estacion.component';
import { CentroComponent } from './pages/centros/centro.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { WelcomeComponent } from './pages/welcome.component';
import { AddusuarioComponent } from './pages/usuarios/addusuario/addusuario.component';
import { EditusuarioComponent } from './pages/usuarios/editusuario/editusuario.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

import { AdminGuardGuard } from './services/admin-guard.guard';
import { LoginGuardGuard } from './services/login-guard.guard';

import { CentroService } from './services/centro.service';
import { EmpresaService } from './services/empresa.service';
import { EstacionService } from './services/estacion.service';
import { BuscadorService } from './services/buscador.service';
import { UsuarioService } from './services/usuario.service';
import { EstadoPipe } from './pipes/estado.pipe';
import { FechaPipe } from './pipes/fecha.pipe';
import { ChartsModule } from 'ng2-charts';
import { JCentroGuardGuard } from './services/jCentro-guard.guard';
import { UserGuardGuard } from './services/user-guard.guard';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GoogleMapsModule } from '@angular/google-maps';
import { PerfilPipe } from './pipes/perfil.pipe';
import { JwPaginationModule } from 'jw-angular-pagination';
import { NoPageFoundComponent } from './pages/no-page-found/no-page-found.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { SidebarModule } from 'ng-sidebar';
import { PasswordComponent } from './pages/usuarios/password/password.component';
import { AlertasComponent } from './pages/alertas/alertas.component';
import { GraficoD3Component } from './pages/estaciones/grafico-d3/grafico-d3.component';
import { GaugeComponent } from './pages/estaciones/gauge/gauge.component';
import { WindActualComponent } from './pages/estaciones/wind-actual/wind-actual.component';
import { TempDiaComponent } from './pages/estaciones/temp-dia/temp-dia.component';
import { TempMesComponent } from './pages/estaciones/temp-mes/temp-mes.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TempAnioComponent } from './pages/estaciones/temp-anio/temp-anio.component';
import { HeadingRSComponent } from './pages/estaciones/heading-rs/heading-rs.component';
import { EscoringRSComponent } from './pages/estaciones/escoring-rs/escoring-rs.component';
import { HistPitchComponent } from './pages/estaciones/hist-pitch/hist-pitch.component';
import { HistRollComponent } from './pages/estaciones/hist-roll/hist-roll.component';
import { HistVelcComponent } from './pages/estaciones/hist-velc/hist-velc.component';
import { HistPressComponent } from './pages/estaciones/hist-press/hist-press.component';
import { OrientationComponent } from './pages/estaciones/orientation/orientation.component';
import { GaugesModule } from '@biacsics/ng-canvas-gauges';
import { ClimaPipe } from './pipes/clima.pipe';
import { PositionComponent } from './pages/estaciones/position/position.component';
import { PresDiaComponent } from './pages/estaciones/pres-dia/pres-dia.component';
import { PresAnioComponent } from './pages/estaciones/pres-anio/pres-anio.component';
import { PresMesComponent } from './pages/estaciones/pres-mes/pres-mes.component';
import { RadiacionDiaComponent } from './pages/estaciones/radiacion-dia/radiacion-dia.component';
import { RadiacionMesComponent } from './pages/estaciones/radiacion-mes/radiacion-mes.component';
import { RadiacionAnioComponent } from './pages/estaciones/radiacion-anio/radiacion-anio.component';
import { PrecipitacionesAnioComponent } from './pages/estaciones/precipitaciones-anio/precipitaciones-anio.component';
import { PrecipitacionesDiaComponent } from './pages/estaciones/precipitaciones-dia/precipitaciones-dia.component';
import { PrecipitacionesMesComponent } from './pages/estaciones/precipitaciones-mes/precipitaciones-mes.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { PresionActualComponent } from './pages/estaciones/presion-actual/presion-actual.component';
import { VelcActualComponent } from './pages/estaciones/velc-actual/velc-actual.component';
import { TempActualComponent } from './pages/estaciones/temp-actual/temp-actual.component';
import { GenpacksComponent } from './pages/genpacks/genpacks.component';
import { GenpackComponent } from './pages/genpacks/genpack.component';
import { BateriaComponent } from './pages/genpacks/bateria/bateria.component';
import { VoltajeComponent } from './pages/genpacks/voltaje/voltaje.component';
import { PotenciaComponent } from './pages/genpacks/potencia/potencia.component';
import { AddgenpackComponent } from './pages/genpacks/addgenpack/addgenpack.component';
import { EditgenpackComponent } from './pages/genpacks/editgenpack/editgenpack.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
import { RadaresComponent } from './pages/radares/radares.component';
import { RadarComponent } from './pages/radares/radar.component';
import { EventosComponent } from './pages/radares/eventos/eventos.component';
import { EventoDiaComponent } from './pages/radares/evento-dia/evento-dia.component';
import { ActividadHoraComponent } from './pages/radares/actividad-hora/actividad-hora.component';
import { EditgeneradorComponent } from './pages/genpacks/editgenerador/editgenerador.component';
import { AddgeneradorComponent } from './pages/genpacks/addgenerador/addgenerador.component';
import { GeneradorComponent } from './pages/genpacks/generador/generador.component';
import { CombustibleDiasComponent } from './pages/genpacks/combustible-dias/combustible-dias.component';
import { CombustibleActualComponent } from './pages/genpacks/combustible-actual/combustible-actual.component';
import { AddRadarComponent } from './pages/radares/add-radar/add-radar.component';
import { EditRadarComponent } from './pages/radares/edit-radar/edit-radar.component';
import { IncidentesComponent } from './pages/incidentes/incidentes.component';
import { AddincidenteComponent } from './pages/incidentes/addincidente/addincidente.component';
import { EditincidenteComponent } from './pages/incidentes/editincidente/editincidente.component';
import { ConfComponent } from './pages/conf/conf.component';

@NgModule({
  declarations: [
    AppComponent,
    EstacionesComponent,
    AddestacionComponent,
    EditestacionComponent,
    EmpresasComponent,
    AddempresaComponent,
    EditempresaComponent,
    LoginComponent,
    CentrosComponent,
    AddcentroComponent,
    EditcentroComponent,
    PagesComponent,
    HeaderComponent,
    FooterComponent,
    EmpresaComponent,
    EstacionComponent,
    CentroComponent,
    WelcomeComponent,
    EstadoPipe,
    FechaPipe,
    PerfilPipe,
    ClimaPipe,
    UsuariosComponent,
    AddusuarioComponent,
    EditusuarioComponent,
    NoPageFoundComponent,
    SidebarComponent,
    PasswordComponent,
    AlertasComponent,
    GraficoD3Component,
    GaugeComponent,
    WindActualComponent,
    TempDiaComponent,
    TempMesComponent,
    TempAnioComponent,
    HeadingRSComponent,
    EscoringRSComponent,
    HistPitchComponent,
    HistRollComponent,
    HistVelcComponent,
    HistPressComponent,
    OrientationComponent,
    PositionComponent,
    PresDiaComponent,
    PresAnioComponent,
    PresMesComponent,
    RadiacionDiaComponent,
    RadiacionMesComponent,
    RadiacionAnioComponent,
    PrecipitacionesAnioComponent,
    PrecipitacionesDiaComponent,
    PrecipitacionesMesComponent,
    NavbarComponent,
    PresionActualComponent,
    VelcActualComponent,
    TempActualComponent,
    GenpacksComponent,
    GenpackComponent,
    BateriaComponent,
    VoltajeComponent,
    PotenciaComponent,
    AddgenpackComponent,
    EditgenpackComponent,
    RadaresComponent,
    RadarComponent,
    EventosComponent,
    EventoDiaComponent,
    ActividadHoraComponent,
    EditgeneradorComponent,
    AddgeneradorComponent,
    GeneradorComponent,
    CombustibleDiasComponent,
    CombustibleActualComponent,
    AddRadarComponent,
    EditRadarComponent,
    IncidentesComponent,
    AddincidenteComponent,
    EditincidenteComponent,
    ConfComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ReactiveFormsModule,
    ChartsModule,
    FontAwesomeModule,
    GoogleMapsModule,
    JwPaginationModule,
    Ng2SearchPipeModule,
    SidebarModule.forRoot(),
    PAGES_ROUTES,
    GaugesModule,
    TableModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
		ButtonModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [AdminGuardGuard, LoginGuardGuard, UserGuardGuard, JCentroGuardGuard, CentroService, EmpresaService, EstacionService, UsuarioService, BuscadorService, NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
