/* eslint-disable import/no-anonymous-default-export */

export default {
  webBasePath: "",
  apiBasePath: "/api",
  accounts: {
    superAdmin: {
      name: "super admin",
      role: {
        level: "super_admin",
        name: "super_admin",
      },
      username: "super_admin",
      password: "super_admin",
      // default password is : super_admin
    },
  },
  vendorInformation: {
    name: "Developed by Intitek Presisi Integrasi R&D Team",
    email: "salessupport@intitek.co.id",
    telp: "021 5091 4753",
    website: "https://intitek.co.id",
  },
  applicationInformation: {
    version: require("../package.json").version,
    name: "Mayora Desktop App",
    hardwareId: "",
    macAddress: "",
    ipAddress: "",
  },
  defaultSettings: {
    application: {
      id_application: "VH746JS90",
      is_accept_all_condition: false,
    },
    database: {
      ip_database: "127.0.0.1",
      port_database: 3306,
      user_database: "root",
      password_database: "",
      name_database: "mayora",
    },
    server: {
      host_server: "http://127.0.0.1",
      port_server: 8000,
    },
    scale: {
      baudrate: "110",
      // 110, 300, 600, 1200, 2400, 4800, 9600, 14400, 19200, 38400, 57600, 115200, 128000 and 256000
      databits: "7",
      // 7, 8
      parity: "none",
      // none, odd, even
      port: "COM1",
      delimiter: 120,
      start_value_substring: 12,
      length_value_substring: 90,
      start_unit_substring: 56,
      length_unit_substring: 100,
    },
  },
  msIntervalCheckConnection: 15000, // 15 sec
};
