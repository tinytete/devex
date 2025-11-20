import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detailfund',
  templateUrl: './detailfund.component.html',
  styleUrl: './detailfund.component.scss'
})
export class DetailfundComponent implements OnInit {
  fundId: number | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idString = params.get('id');
      this.fundId = idString? + idString : undefined;
      console.log('loading detail for Fund ID:', this.fundId);
    });
  }
}
