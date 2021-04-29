import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Playlist } from '../../core/models/playlist.model';

@Component({
  selector: 'app-playlist-form',
  templateUrl: './playlist-form.component.html',
  styleUrls: ['./playlist-form.component.scss'],
})
export class PlaylistFormComponent implements OnInit {
  public playlistForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PlaylistFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Playlist
  ) {
    this.playlistForm = this.fb.group({
      name: [this.data.name, Validators.required],
      description: [this.data.description ?? ''],
      isPublic: [this.data.isPublic ?? false, Validators.required],
    });
  }

  ngOnInit(): void {}

  onSave(): void {
    this.dialogRef.close({ ...this.data, ...this.playlistForm.value });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
