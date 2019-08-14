import {ReportModel} from '../report.model';

export interface ReportState {
  list: ReportModel[];
  current: ReportModel;
}

export interface AppReportState {
  report: ReportState;
}

export const appStateReport: AppReportState = {
  report: {
    list: [],
    current: {
      id: null
    },
  }
};
