import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';


@Component({
  selector: 'app-imagem',
  templateUrl: './imagem.component.html',
  styleUrls: ['./imagem.component.scss']
})
export class ImagemComponent implements OnInit {

  fileData: File = null;
  @Output('resultado')
  resultado = new EventEmitter<string[]>();

  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;

  constructor(private http: HttpClient) { }

  @Input('multiplo')
  multiplo: boolean = false;

  ngOnInit(): void {
  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
      this.resultado.emit([this.previewUrl]);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('files', this.fileData);

    this.fileUploadProgress = '0%';

    this.http.post('https://us-central1-tutorial-e6ea7.cloudfunctions.net/fileUpload', formData, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(events => {
        if (events.type === HttpEventType.UploadProgress) {
          this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
          //console.log(this.fileUploadProgress);
        } else if (events.type === HttpEventType.Response) {
          this.fileUploadProgress = '';
          // console.log(events.body);
          alert('SUCCESS !!');
        }
      });
  }
}
