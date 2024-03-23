import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClientModule } from '@angular/common/http';
import { CusProfileComponent } from './cus-profile/cus-profile.component';
import { CusDashboardComponent } from './cus-dashboard/cus-dashboard.component';
import { FinDetailsComponent } from './fin-details/fin-details.component';
import { InquiryDataComponent } from './inquiry-data/inquiry-data.component';
import { SaleOrderDataComponent } from './sale-order-data/sale-order-data.component';
import { ListOfDeliveryComponent } from './list-of-delivery/list-of-delivery.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { PaymentsAndAgingComponent } from './payments-and-aging/payments-and-aging.component';
import { CreditDebitMemoComponent } from './credit-debit-memo/credit-debit-memo.component';
import { OverallSalesDataComponent } from './overall-sales-data/overall-sales-data.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { StarterPageComponent } from './starter-page/starter-page.component';
import { VPLoginComponent } from './vp-login/vp-login.component';
import { VPDashboardComponent } from './vp-dashboard/vp-dashboard.component';
import { VenProfileComponent } from './ven-profile/ven-profile.component';
import { VenFinDetailsComponent } from './ven-fin-details/ven-fin-details.component';
import { VPInvoiceDetailsComponent } from './vp-invoice-details/vp-invoice-details.component';
import { VPPaymentsAndAgingComponent } from './vp-payments-and-aging/vp-payments-and-aging.component';
import { VenDashboardComponent } from './ven-dashboard/ven-dashboard.component';
import { VpCreditDebitMemoComponent } from './vp-credit-debit-memo/vp-credit-debit-memo.component';
import { VpReqQuotationComponent } from './vp-req-quotation/vp-req-quotation.component';
import { VpPurchaseOrderComponent } from './vp-purchase-order/vp-purchase-order.component';
import { VpGoodsReceiptComponent } from './vp-goods-receipt/vp-goods-receipt.component';
import { EpLoginComponent } from './ep-login/ep-login.component';
import { EpDashboardComponent } from './ep-dashboard/ep-dashboard.component';
import { EmpProfileComponent } from './emp-profile/emp-profile.component';
import { EmpLeaveComponent } from './emp-leave/emp-leave.component';
import { EmpPayslipComponent } from './emp-payslip/emp-payslip.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { LogoutDialogComponent } from './logout-dialog/logout-dialog.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { RowDetailsDialogComponent } from './row-details-dialog/row-details-dialog.component';


@NgModule({
  declarations: [
    AppComponent, LoginComponent, DashboardComponent, CusProfileComponent, CusDashboardComponent, FinDetailsComponent, InquiryDataComponent, SaleOrderDataComponent, ListOfDeliveryComponent, InvoiceDetailsComponent, PaymentsAndAgingComponent, CreditDebitMemoComponent, OverallSalesDataComponent, StarterPageComponent, VPLoginComponent, VPDashboardComponent, VenProfileComponent, VenFinDetailsComponent, VPInvoiceDetailsComponent, VPPaymentsAndAgingComponent, VenDashboardComponent, VpCreditDebitMemoComponent, VpPurchaseOrderComponent, VpGoodsReceiptComponent, VpReqQuotationComponent, EpLoginComponent, EpDashboardComponent, EmpProfileComponent, EmpLeaveComponent, EmpPayslipComponent, LogoutDialogComponent, ConfirmationDialogComponent, RowDetailsDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatGridListModule,
    HttpClientModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,


  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }  