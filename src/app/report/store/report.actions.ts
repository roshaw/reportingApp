import { Action } from '@ngrx/store';
import {ReportModel} from '../report.model';

export enum ActionTypes {
  GET_REPORTS = '[Reports] Get reports',
  POPULATE_REPORTS_LIST = '[Reports] Populate reports list',
  GET_SINGLE_REPORT = '[Reports] Get single report',
  POPULATE_CURRENT_REPORT = '[Reports] Populate current report',
  CREATE_REPORT = '[Reports] Create report',
  UPDATE_REPORT = '[Reports] Update report',
  POPULATE_SECTION_IN_CURRENT_REPORT = '[Reports] Update section in current report'
}

export class GetReports implements Action {
  readonly type: ActionTypes.GET_REPORTS = ActionTypes.GET_REPORTS;
}

export class PopulateReportsList implements Action {
  readonly type: ActionTypes.POPULATE_REPORTS_LIST = ActionTypes.POPULATE_REPORTS_LIST;
  constructor(public reports: ReportModel[] = []) {}
}

export class GetSingleReport implements Action {
  readonly type: ActionTypes.GET_SINGLE_REPORT = ActionTypes.GET_SINGLE_REPORT;
  constructor(public id: number) {}
}

export class PopulateCurrentReport implements Action {
  readonly type: ActionTypes.POPULATE_CURRENT_REPORT = ActionTypes.POPULATE_CURRENT_REPORT;
  constructor(public report: ReportModel = {id: null}) {}
}

export class CreateReport implements Action {
  readonly type: ActionTypes.CREATE_REPORT = ActionTypes.CREATE_REPORT;
  constructor(public report: ReportModel) {}
}

export class UpdateReport implements Action {
  readonly type: ActionTypes.UPDATE_REPORT = ActionTypes.UPDATE_REPORT;
  constructor(public report: ReportModel) {}
}

export class PopulateSectionInCurrentReport implements Action {
  readonly type: ActionTypes.POPULATE_SECTION_IN_CURRENT_REPORT = ActionTypes.POPULATE_SECTION_IN_CURRENT_REPORT;
  constructor(public sectionName: string, public value: any) {}
}

export type All = GetReports
  | PopulateReportsList
  | GetSingleReport
  | PopulateCurrentReport
  | CreateReport
  | UpdateReport
  | PopulateSectionInCurrentReport;
