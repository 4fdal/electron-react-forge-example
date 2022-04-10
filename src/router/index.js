import React from "react";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
  Router,
} from "react-router-dom";
import MainLayout from "../layout/main-layout";
import MinimalLayout from "../layout/minimal-layout";
import LoginPage from "../page/auth/login-page";
import HomePage from "../page/home/home-page";
import MasterProductPage from "../page/master/product/master-product-page";
import MasterOperatorPage from "../page/master/operator/master-operator-page";
import MasterShiftPage from "../page/master/shift/master-shift-page";
import SettingsApplicationPage from "../page/settings/application/settings-application-page";
import SettingsDatabasePage from "../page/settings/database/settings-database-page";
import SettingsServerPage from "../page/settings/server/settings-server-page";
import SettingsScalePage from "../page/settings/scale/settings-scale-page";
import ReportPage from "../page/report/report-page";
import AboutPage from "../page/about/about-page";
import SettingsMainLayout from "../layout/settings-main-layout";
import MasterMainLayout from "../layout/master-main-layout";
import LicensePage from "../page/license/license-page";
import SplashscreenPage from "../page/splashscreen/splashscreen-page";
import {
  KEY_ACCESS_TOKEN,
  KEY_LICENSE,
  KEY_USER,
} from "../utils/constants/call-key-storage";

export function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

class Routers extends React.Component {
  hasAuthenticate = () => {
    let access_token = localStorage.getItem(KEY_ACCESS_TOKEN);
    let user = localStorage.getItem(KEY_USER);

    return (
      ![undefined, null, ""].includes(access_token) &&
      ![undefined, null, ""].includes(user)
    );
  };

  hasLicense = () => {
    let license = localStorage.getItem(KEY_LICENSE);

    return ![undefined, null, ""].includes(license);
  };

  render = () => {
    return (
      <Routes>
        {/* splashscreen */}
        <Route path="/" index element={<SplashscreenPage {...this.props} />} />

        {this.hasAuthenticate() && this.hasLicense() && (
          <>
            {/* home */}
            <Route path="/home" element={<MainLayout {...this.props} />}>
              <Route index element={<HomePage {...this.props} />} />
            </Route>

            {/* home */}
            <Route path="/home" element={<MainLayout {...this.props} />}>
              <Route index element={<HomePage {...this.props} />} />
            </Route>

            {/* master */}
            <Route
              path="/home/master"
              element={<MasterMainLayout {...this.props} />}
            >
              <Route index element={<MasterProductPage {...this.props} />} />
              <Route
                path="/home/master/product"
                element={<MasterProductPage {...this.props} />}
              />
              <Route
                path="/home/master/operator"
                element={<MasterOperatorPage {...this.props} />}
              />
              <Route
                path="/home/master/shift"
                element={<MasterShiftPage {...this.props} />}
              />
            </Route>

            {/* settings */}
            <Route
              path="/home/settings"
              element={<SettingsMainLayout {...this.props} />}
            >
              <Route
                index
                element={<SettingsApplicationPage {...this.props} />}
              />
              <Route
                path="/home/settings/application"
                element={<SettingsApplicationPage {...this.props} />}
              />
              <Route
                path="/home/settings/database"
                element={<SettingsDatabasePage {...this.props} />}
              />
              <Route
                path="/home/settings/server"
                element={<SettingsServerPage {...this.props} />}
              />
              <Route
                path="/home/settings/scale"
                element={<SettingsScalePage {...this.props} />}
              />
            </Route>

            {/* report */}
            <Route path="/home/report" element={<MainLayout {...this.props} />}>
              <Route index element={<ReportPage {...this.props} />} />
            </Route>

            {/* about */}
            <Route path="/home/about" element={<MainLayout {...this.props} />}>
              <Route index element={<AboutPage {...this.props} />} />
            </Route>
          </>
        )}

        {/* auth */}
        <Route path="/auth" element={<MinimalLayout {...this.props} />}>
          <Route index element={<LoginPage {...this.props} />} />
        </Route>

        {/* license */}
        <Route path="/license" element={<MinimalLayout {...this.props} />}>
          <Route index element={<LicensePage {...this.props} />} />
        </Route>

        <Route path="*" element={<SplashscreenPage {...this.props} />} />
      </Routes>
    );
  };
}

export default withRouter(Routers);
