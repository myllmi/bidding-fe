import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BidService} from '../../../service/bid.service';
import {marked} from 'marked';
import {ProfileService} from '../../../service/profile.service';
import {CandidateService} from '../../../service/candidate.service';
import {FinalResumeData} from '../../../model/interfaces';
import {catchError, EMPTY, switchMap, tap} from 'rxjs';

@Component({
  selector: 'app-preview-bid',
  imports: [],
  templateUrl: './preview-bid.component.html',
  styleUrl: './preview-bid.component.css',
})
export class PreviewBidComponent implements OnInit {

  activatedRoute = inject(ActivatedRoute);

  bidService = inject(BidService)
  profileService = inject(ProfileService);
  candidateService = inject(CandidateService);

  invalidBid: boolean = false;

  rational: string = '';
  arrFinalResume: any[] = [];

  ngOnInit() {
    const idBid = this.activatedRoute.snapshot.paramMap.get('idBid');
    if (!idBid) {
      this.invalidBid = true;
    } else {
      this.bidService.getBid(idBid).pipe(
        tap(bid => {
          this.rational = bid.rational_md;
        }),
        switchMap(bid =>
          this.bidService.getBidCandidate(bid.evaluation_id)
        ),
        catchError(err => {
          console.error('Error on get bid:', err);
          return EMPTY;
        })
      ).subscribe(candidate => {
        console.log(candidate);
        candidate.forEach((item: { profile: any; name_professional: any; }) => {
          this.arrFinalResume.push({
            profile: item.profile,
            candidate: item.name_professional
          })
        })
      });
    }
  }

  convertRational() {
    return marked.parse(this.rational).toString();
  }

  protected convertExperience(experience: string) {
    return marked.parse(experience).toString();
  }
}
