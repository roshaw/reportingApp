import {Validators} from '@angular/forms';
import {NoLRWhitespaceValidator} from '../shared/validators/whitespace.validator';

export interface ReportModel {
  id: number;
  basicInfo?: {
    childName?: string;
    dateOfBirth?: string;
    dateOfBirthAsDate?: Date;
    allegation?: string;
  };
  allegation?: {
    perpetratorName?: string;
    perpetratorStatus?: string;
    deptNumberOfOffice?: string;
  };
}
