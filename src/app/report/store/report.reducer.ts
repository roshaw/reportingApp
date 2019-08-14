import {appStateReport, ReportState} from './report.state';
import {ActionTypes, All} from './report.actions';


export function reportReducer(state: ReportState = appStateReport.report, action: All): ReportState {
  switch (action.type) {
    case ActionTypes.POPULATE_REPORTS_LIST:
      return {
        ...state,
        list: action.reports
      };
    case ActionTypes.POPULATE_CURRENT_REPORT:
      return {
        ...state,
        current: action.report
      };
    case ActionTypes.POPULATE_SECTION_IN_CURRENT_REPORT:
      return {
        ...state,
        current: {
          ...state.current,
          [action.sectionName]: action.value
        }
      };
    default: return state;
  }
}
