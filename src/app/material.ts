import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
    imports: [
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
    ],
    exports: [
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
    ],
})
export class MaterialModule { }
