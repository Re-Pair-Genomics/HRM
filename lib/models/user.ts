import { UserProfile } from './userProfile';
import { Action } from './action';
import { PaymentDetails } from './paymentDetails';
import { Report } from './report';
import { Payroll } from './payroll';
import { Organization } from './organization';

export class User {

  readonly id: string;

  public username: string;
  public email: string;
  private password: string;
  private organization: Organization | null;
  private profile: UserProfile | null;
  private actions: { [name: string]: Action } = {};
  private paymentInfo: PaymentDetails | null;
  private reportHistory: { [timestamp: number]: Report } = {};
  private payrollHistory: { [timestamp: number]: Payroll } = {};

  public constructor(
    id: string,
    username: string,
    password: string,
    email: string,
    organization: Organization | null,
    profile: UserProfile | null,
    actions: { [name: string]: Action },
    paymentInfo: PaymentDetails | null,
    reportHistory: { [timestamp: number]: Report },
    payrollHistory: { [timestamp: number]: Payroll }
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.organization = organization;
    this.profile = profile;
    this.actions = actions;
    this.paymentInfo = paymentInfo;
    this.reportHistory = reportHistory;
    this.payrollHistory = payrollHistory;
  }

  // Reset the user's password
  public resetPassword(newPassword: string) {
    this.password = newPassword;
  }

  // getter methods for public fields
  public getProfile() {
    return this.profile;
  }

  public getPassword() {
    return this.password;
  }

  public getPaymentInfo() {
    return this.paymentInfo;
  }

  public getOrganization() {
    return this.organization;
  }

  public getActions() {
    return this.actions;
  }

  // Add a new action to the user
  public addAction(action: Action) {
    this.actions[action.name] = action;
  }

  // Remove an action from the user
  public removeAction(action: Action) {
    delete this.actions[action.name];
  }

  // Add a new report to the user's history
  public addReport(report: Report) {
    this.reportHistory[report.timestamp.getTime()] = report;
  }

  // Add a new payroll to the user's history
  public addPayroll(payroll: Payroll) {
    this.payrollHistory[payroll.timestamp.getTime()] = payroll;
  }

  // Update the user's profile
  public updateProfile(profile: UserProfile) {
    this.profile = profile;
  }

  // Update the user's organization
  public updateOrganization(organization: Organization) {
    this.organization = organization;
  }

  // Update the user's payment information
  public updatePaymentInfo(paymentInfo: PaymentDetails) {
    this.paymentInfo = paymentInfo;
  }
}
