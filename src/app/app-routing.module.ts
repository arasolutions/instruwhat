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
    loadChildren: () => import('./pages/single-game/game/game.module').then( m => m.GamePageModule)
  },
  {
    path: 'param-game',
    loadChildren: () => import('./pages/single-game/param-game/param-game.module').then( m => m.ParamGamePageModule)
  },
  {
    path: 'initial-game',
    loadChildren: () => import('./pages/single-game/initial-game/initial-game.module').then( m => m.InitialGamePageModule)
  },
  {
    path: 'final-game',
    loadChildren: () => import('./pages/single-game/final-game/final-game.module').then( m => m.FinalGamePageModule)
  },
  {
    path: 'double-game',
    loadChildren: () => import('./pages/double-game/game/double-game.module').then( m => m.DoubleGamePageModule)
  },
  {
    path: 'double-param-game',
    loadChildren: () => import('./pages/double-game/param-game/double-param-game.module').then( m => m.DoubleParamGamePageModule)
  },
  {
    path: 'double-initial-game',
    loadChildren: () => import('./pages/double-game/initial-game/double-initial-game.module').then( m => m.DoubleInitialGamePageModule)
  },
  {
    path: 'double-final-game',
    loadChildren: () => import('./pages/double-game/final-game/double-final-game.module').then( m => m.DoubleFinalGamePageModule)
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
