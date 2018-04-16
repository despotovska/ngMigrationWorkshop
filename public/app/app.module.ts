import { NgModule, } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UpgradeModule } from '@angular/upgrade/static';
import { AppComponent } from "./app.component";
import { NameParser } from "./admin/nameParser.service";
import { UnreviewedTalkComponent } from "./home/unreviewedTalk.component";
import { TalkDurationPipe } from "./common/talkDuration.pipe";
import { ProfileComponent } from "./profile/profile.component";
import { TOASTR_TOKEN } from "./toastr/toastr.service";
import { NavComponent } from "./nav/nav.component";
import { Sessions } from "./sessions/sessions.service";
import { DetailPanelComponent } from "./common/detailPanel.component";
import { SessionDetailWithVotesComponent } from "./sessions/sessionDetailWithVotes.component";
import { ResultsComponent } from "./admin/results.component";
import { RouterModule, UrlHandlingStrategy, UrlTree } from "@angular/router";
import { AllSessionsResolver } from "./sessions/allSessions.resolver";

export function getLocation(i) {
  return i.get('$location')
}
export function getCurrentIdentity(i) {
  return i.get('currentIdentity')
}
export function getToastr() {
  return toastr;
}

class Ng1Ng2UrlHandlingStrategy implements UrlHandlingStrategy {
  shouldProcessUrl(url: UrlTree): boolean {
    return url.toString().startsWith('/admin/results');
  }
  extract(url: UrlTree): UrlTree {
    return url;
  }
  merge(newUrlPart: UrlTree, rawUrl: UrlTree): UrlTree {
    return newUrlPart
  }
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    UpgradeModule,
    RouterModule.forRoot([
      { path: 'admin/results', component: ResultsComponent,
      resolve: { sessions: AllSessionsResolver}}
    ], {useHash: true})
  ],
  declarations: [
    AppComponent,
    UnreviewedTalkComponent,
    TalkDurationPipe,
    ProfileComponent,
    NavComponent,
    DetailPanelComponent,
    SessionDetailWithVotesComponent,
    ResultsComponent
  ],
  providers: [
    NameParser,
    Sessions,
    { provide: '$location', useFactory: getLocation, deps: ['$injector']},
    { provide: 'currentIdentity', useFactory: getCurrentIdentity, deps: ['$injector']},
    { provide: TOASTR_TOKEN, useFactory: getToastr },
    { provide: UrlHandlingStrategy, useClass: Ng1Ng2UrlHandlingStrategy},
    { provide: '$scope', useExisting: '$rootScope'},
    AllSessionsResolver
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    UnreviewedTalkComponent,
    ProfileComponent,
    DetailPanelComponent,
    ResultsComponent
  ]
})
export class AppModule {}