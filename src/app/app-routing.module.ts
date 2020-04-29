import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'param-game',
    pathMatch: 'full'
  },
  {
    path: 'game',
    loadChildren: () => import('./pages/game/game.module').then( m => m.GamePageModule)
  },
  {
    path: 'param-game',
    loadChildren: () => import('./pages/param-game/param-game.module').then( m => m.ParamGamePageModule)
  },
  {
    path: 'initial-game',
    loadChildren: () => import('./pages/initial-game/initial-game.module').then( m => m.InitialGamePageModule)
  },
  {
    path: 'final-game',
    loadChildren: () => import('./pages/final-game/final-game.module').then( m => m.FinalGamePageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'scores',
    loadChildren: () => import('./pages/scores/scores.module').then( m => m.ScoresPageModule)
  },
  {
    path: 'glossary',
    loadChildren: () => import('./pages/glossary/glossary.module').then( m => m.GlossaryPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
