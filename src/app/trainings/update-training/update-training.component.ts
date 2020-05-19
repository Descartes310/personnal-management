import { Component, OnInit } from '@angular/core';
import { TrainingService } from 'src/app/_services/training.service';
import { NotifService } from 'src/app/_services/notif.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Training } from 'src/app/_models/training.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-training',
  templateUrl: './update-training.component.html',
  styleUrls: ['./update-training.component.scss']
})
export class UpdateTrainingComponent implements OnInit {

  /* trainings: any[] = [];
  training_tmp: any[] = []; */

  trainingForm: FormGroup;
  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;
  training_name = '';
  training: Training = new Training();
  constructor(
    private trainingService: TrainingService,
    private notifService: NotifService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.initForm();
    const training_id = +this.route.snapshot.paramMap.get("id");
    this.trainingService.find(training_id).then(
      data => {
        console.log(data)
        this.training = data;
        this.initForm(true);
        console.log(this.training)
      }
    ).catch(
      error => {
        console.log(error);
        this.translate.get('Training.TRAINING_NOT_FOUND')
        .subscribe(val => this.notifService.danger(val));
      }
    )

  }

  initForm(withTraining = false) {
    if(withTraining) {
      console.log(this.training)
      this.trainingForm = this.formBuilder.group({
        name: [this.training.name, [Validators.required]],
        slug: [this.training.slug, [Validators.required]],
        trainer: [this.training.trainer, [Validators.required]],
        start_date: [this.training.start_date, [Validators.required]],
        location: [this.training.location, [Validators.required]],
        duration: [this.training.duration, [Validators.required]],
        description: [this.training.description]
      });
    }else {
      this.trainingForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        slug: ['', [Validators.required]],
        trainer: ['', [Validators.required]],
        start_date: ['', [Validators.required]],
        location: ['', [Validators.required]],
        duration: ['', [Validators.required]],
        description: ['']
      });
    }
  }

  get form() {
    return this.trainingForm.controls;
  }

  computeName(event){
    this.training_name = event.target.value.replace(/[^A-Z0-9]/ig, "_");
  }

  onSubmit() {
    this.isSubmitted = true;
    this.isError = false;
    this.isSuccess = false;
    this.isLoading = false
    // Si la validation a echoué, on arrete l'execution de la fonction
    this.form.name.setValue(this.training_name);
    if (this.trainingForm.invalid) {
      this.translate.get('Training.SubmitError')
        .subscribe(val => this.notifService.danger(val));
      return;
    }

    this.isLoading = true;
    const formData = new FormData();
    formData.append('name', '' + this.form.name.value);
    formData.append('trainer', '' + this.form.trainer.value);
    formData.append('start_date', '' + this.form.start_date.value);
    formData.append('location', '' + this.form.location.value);
    formData.append('duration', '' + this.form.duration.value);
    formData.append('description', '' + this.form.description.value);
    
    this.trainingService.update(formData, this.training.id)
      .then(resp => {
        this.translate.get('Training.SubmitSuccess')
        .subscribe(val => this.notifService.success(val));
        this.isSubmitted = false;
        this.trainingForm.reset();
        //this.router.navigate(['/trainings/all']);
      })
      .catch(err => {
        console.log(err)
        this.translate.get('Training.'+err.error.code)
        .subscribe(val => this.notifService.danger(val));
      })
      .finally(() => this.isLoading = false);
  }
}
