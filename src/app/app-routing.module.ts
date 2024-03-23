import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StarterPageComponent } from './starter-page/starter-page.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
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
import { VPLoginComponent } from './vp-login/vp-login.component';
import { VPDashboardComponent } from './vp-dashboard/vp-dashboard.component';
import { VenProfileComponent } from './ven-profile/ven-profile.component';
import { VenFinDetailsComponent } from './ven-fin-details/ven-fin-details.component';
import { VPInvoiceDetailsComponent } from './vp-invoice-details/vp-invoice-details.component';
import { VPPaymentsAndAgingComponent } from './vp-payments-and-aging/vp-payments-and-aging.component';
import { VpCreditDebitMemoComponent } from './vp-credit-debit-memo/vp-credit-debit-memo.component';
import { VenDashboardComponent } from './ven-dashboard/ven-dashboard.component';
import { VpPurchaseOrderComponent } from './vp-purchase-order/vp-purchase-order.component';
import { VpGoodsReceiptComponent } from './vp-goods-receipt/vp-goods-receipt.component';
import { VpReqQuotationComponent } from './vp-req-quotation/vp-req-quotation.component';
import { EpLoginComponent } from './ep-login/ep-login.component';
import { EpDashboardComponent } from './ep-dashboard/ep-dashboard.component';
import { EmpLeaveComponent } from './emp-leave/emp-leave.component';
import { EmpProfileComponent } from './emp-profile/emp-profile.component';
import { EmpPayslipComponent } from './emp-payslip/emp-payslip.component';


const routes: Routes = [

  { path: '', component: StarterPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'cus-profile', component: CusProfileComponent },
  { path: 'cus-dashboard', component: CusDashboardComponent },
  { path: 'fin-details', component: FinDetailsComponent },
  { path: 'inquiry-data', component: InquiryDataComponent },
  { path: 'sale-order-data', component: SaleOrderDataComponent },
  { path: 'list-of-delivery', component: ListOfDeliveryComponent },
  { path: 'invoice-details', component: InvoiceDetailsComponent },
  { path: 'payments-and-aging', component: PaymentsAndAgingComponent },
  { path: 'credit-debit-memo', component: CreditDebitMemoComponent },
  { path: 'overall-sales-data', component: OverallSalesDataComponent },
  { path: 'starter-page', component: StarterPageComponent },
  { path: 'vp-login', component: VPLoginComponent },
  { path: 'vp-dashboard', component: VPDashboardComponent },
  { path: 'ven-profile', component: VenProfileComponent },
  { path: 'ven-fin-details', component: VenFinDetailsComponent },
  { path: 'vp-invoice-details', component: VPInvoiceDetailsComponent },
  { path: 'vp-payments-and-aging', component: VPPaymentsAndAgingComponent },
  { path: 'ven-dashboard', component: VenDashboardComponent },
  { path: 'vp-credit-debit-memo', component: VpCreditDebitMemoComponent },
  { path: 'vp-req-quotation', component: VpReqQuotationComponent },
  { path: 'vp-purchase-order', component: VpPurchaseOrderComponent },
  { path: 'vp-goods-receipt', component: VpGoodsReceiptComponent },
  { path: 'ep-login', component: EpLoginComponent },
  { path: 'ep-dashboard', component: EpDashboardComponent},
  { path: 'emp-profile', component: EmpProfileComponent },
  { path: 'emp-leave', component: EmpLeaveComponent },
  { path: 'emp-payslip', component: EmpPayslipComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }