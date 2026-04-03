import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import Employees from "./pages/Employee/Employees";
import Attendance from "./pages/Attendance/Attendance";
import Payroll from "./pages/Payroll/Payroll";
import Payouts from "./pages/Payroll/Payouts"; // ✅ added
import Compliance from "./pages/Compliance/Compliance";
import Reports from "./pages/Reports/Reports";
import Organization from "./pages/Organization/Organization";
import Management from "./pages/Management/Management";
import PayConsultant from "./pages/Payroll/PayConsultant";
import Onboarding from "./pages/Onboarding/Onboarding";
import Branding from "./pages/Recruit/Branding";
import OfferLetter from "./pages/Recruit/OfferLetter";
import JobPostings from "./pages/Recruit/JobPostings";
import FullnFinal from "./pages/Employee/FullnFinal";
import HrLetter from './pages/Employee/HrLetter'
import AdvancesnLoans from "./pages/Payroll/AdvancesnLoans";
import Reimbursement from "./pages/Payroll/Reimbursement";
import MultiplePayouts from "./pages/Payroll/MultiplePayouts";
import PieceRate from "./pages/Payroll/PieceRate";
import BulkAttendance from "./pages/Attendance/BulkAttendance";
import GeneratePayment from "./pages/Attendance/GeneratePayment";
import LockAttendance from "./pages/Attendance/LockAttendance";
import CheckIn from "./pages/Attendance/CheckIn";
export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Dashboard Layout */}
        <Route element={<AppLayout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/payroll" element={<Payroll />} />
          <Route path="/payroll/payouts" element={<Payouts />} /> {/* ✅ added */}
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/organization" element={<Organization />} />
          <Route path="/management" element={<Management />} />
<Route path="/onboarding" element={<Onboarding />} />
<Route path="/recruit/offer-letter" element={<OfferLetter />} />
<Route path="/recruit/Branding" element={<Branding/>}/>
<Route path="/recruit/job-postings" element={<JobPostings/>}/>
<Route path="/employees/full-and-final" element={<FullnFinal/>}/>
<Route path="/employees/hr-letter" element={<HrLetter />} />
<Route path="/payroll/advances-loans" element={<AdvancesnLoans />} />
<Route path="/payroll/reimbursements" element={<Reimbursement />} />
<Route path="/payroll/multiple-payout" element={<MultiplePayouts />} />
<Route path="/payroll/piece-rate-payout" element={<PieceRate />} />
<Route path="/attendance/bulk-summary" element={<BulkAttendance />} />
<Route path="/attendance/generate-salary-advice" element={<GeneratePayment />} />
<Route path="/attendance/lock-attendance" element={<LockAttendance />} />
<Route path="/attendance/check  in" element={<CheckIn />} />




          {/* Employees page */}
          <Route path="/employees" element={<Employees />} />
<Route path="/payroll/pay-consultant" element={<PayConsultant />} />

          <Route path="/attendance" element={<Attendance />} />

          {/* Reports */}
          <Route path="/reports/payroll" element={<Reports />} />
          <Route path="/reports/attendance" element={<Reports />} />
          <Route path="/reports/salary-sheet" element={<Reports />} />
          <Route path="/reports/invoice" element={<Reports />} />

          {/* Others */}
          <Route path="/profile" element={<UserProfiles />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/blank" element={<Blank />} />

          {/* Forms */}
          <Route path="/form-elements" element={<FormElements />} />

          {/* Tables */}
          <Route path="/basic-tables" element={<BasicTables />} />

          {/* Ui Elements */}
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/avatars" element={<Avatars />} />
          <Route path="/badge" element={<Badges />} />
          <Route path="/buttons" element={<Buttons />} />
          <Route path="/images" element={<Images />} />
          <Route path="/videos" element={<Videos />} />

          {/* Charts */}
          <Route path="/line-chart" element={<LineChart />} />
          <Route path="/bar-chart" element={<BarChart />} />
        </Route>

        {/* Auth Layout */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}