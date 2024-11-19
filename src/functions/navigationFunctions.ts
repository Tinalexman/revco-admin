export const ROLE_AGENT: string = "Agent";
export const ROLE_INDIVIDUAL: string = "Individual";
export const ROLE_NON_INDIVIDUAL: string = "Non-Individual";
export const ROLE_BANK_STAFF: string = "Bank-Staff";
export const ROLE_ADMIN: string = "Admin";
export const ROLE_SUB_ADMIN_3 = "Sub-Admin3";
export const ROLE_SUB_ADMIN_2 = "Sub-Admin2";
export const ROLE_SUB_ADMIN_1 = "Sub-Admin1";
export const ROLE_PROJECT_REPORT = "Project-Report";
export const ROLE_TAX_CLEARANCE = "Tax-Clearance";

export const determineFirstPage = (role: string) => {
  role = role.trim();

  if (canViewDashboard(role)) {
    if (canViewDashboardOverview(role)) {
      return "/dashboard";
    } else if (canViewDashboardInformalSector(role)) {
      return "/dashboard/informal-sector";
    } else if (canViewDashboardFormalSector(role)) {
      return "/dashboard/formal-sector";
    }
  } else if (canViewPayments(role)) {
    if (canViewPaymentTransactions(role)) {
      return "/dashboard/payments/transactions";
    } else if (canViewPaymentChannels(role)) {
      return "/dashboard/payments/payment-channels";
    } else if (canViewPaymentInvoices(role)) {
      return "/dashboard/payments/invoice-management";
    } else if (canViewPaymentRefunds(role)) {
      return "/dashboard/payments/refund-processing";
    }
  } else if (canViewOrganizations(role)) {
    return "/dashboard/organizations";
  } else if (canViewObjections(role)) {
    return "/dashboard/objections";
  } else if (canViewUsers(role)) {
    if (canViewAdminUsers(role)) {
      return "/dashboard/users/admin-users";
    } else if (canViewTaxPayers(role)) {
      return "/dashboard/users/tax-payers";
    }
  } else if (canViewReports(role)) {
    return "/dashboard/reports";
  } else if (canViewSupport(role)) {
    return "/dashboard/support";
  } else if (canViewSettings(role)) {
    return "/dashboard/settings";
  }

  return "/auth/login";
};

export const canViewDashboard = (role: string) => {
  return (
    role === ROLE_ADMIN ||
    role === ROLE_SUB_ADMIN_1 ||
    role === ROLE_SUB_ADMIN_2 ||
    role === ROLE_SUB_ADMIN_3
  );
};

export const canViewDashboardOverview = (role: string) => {
  return (
    role === ROLE_SUB_ADMIN_2 ||
    role === ROLE_SUB_ADMIN_1 ||
    role === ROLE_ADMIN ||
    role === ROLE_PROJECT_REPORT
  );
};

export const canViewDashboardFormalSector = (role: string) => {
  return (
    role === ROLE_SUB_ADMIN_1 ||
    role === ROLE_ADMIN ||
    role === ROLE_PROJECT_REPORT
  );
};

export const canViewDashboardInformalSector = (role: string) => {
  return (
    role === ROLE_SUB_ADMIN_1 ||
    role === ROLE_ADMIN ||
    role === ROLE_PROJECT_REPORT
  );
};

export const canViewPayments = (role: string) => {
  return (
    role === ROLE_SUB_ADMIN_1 ||
    role === ROLE_ADMIN ||
    role === ROLE_PROJECT_REPORT
  );
};

export const canViewPaymentTransactions = (role: string) => {
  return true;
};

export const canViewPaymentChannels = (role: string) => {
  return (
    role === ROLE_SUB_ADMIN_1 ||
    role === ROLE_ADMIN ||
    role === ROLE_PROJECT_REPORT
  );
};

export const canViewPaymentInvoices = (role: string) => {
  return (
    role === ROLE_SUB_ADMIN_2 ||
    role === ROLE_SUB_ADMIN_1 ||
    role === ROLE_ADMIN ||
    role === ROLE_PROJECT_REPORT
  );
};

export const canViewPaymentRefunds = (role: string) => {
  return (
    role === ROLE_ADMIN ||
    role === ROLE_SUB_ADMIN_1 ||
    role === ROLE_SUB_ADMIN_2 ||
    role === ROLE_SUB_ADMIN_3
  );
};

export const canViewOrganizations = (role: string) => {
  return (
    role === ROLE_ADMIN ||
    role === ROLE_SUB_ADMIN_1 ||
    role === ROLE_SUB_ADMIN_2
  );
};

export const canViewObjections = (role: string) => {
  return (
    role === ROLE_ADMIN ||
    role === ROLE_SUB_ADMIN_1 ||
    role === ROLE_SUB_ADMIN_2
  );
};

export const canViewUsers = (role: string) => {
  return (
    role === ROLE_ADMIN ||
    role === ROLE_SUB_ADMIN_1 ||
    role === ROLE_SUB_ADMIN_2
  );
};

export const canViewAdminUsers = (role: string) => {
  return (
    role === ROLE_ADMIN ||
    role === ROLE_SUB_ADMIN_1 ||
    role === ROLE_SUB_ADMIN_2
  );
};

export const canViewTaxPayers = (role: string) => {
  return (
    role === ROLE_ADMIN ||
    role === ROLE_SUB_ADMIN_1 ||
    role === ROLE_SUB_ADMIN_2
  );
};

export const canViewReports = (role: string) => {
  return (
    role === ROLE_ADMIN ||
    role === ROLE_SUB_ADMIN_1 ||
    role === ROLE_SUB_ADMIN_2
  );
};

export const canViewSupport = (role: string) => {
  return true;
};

export const canViewSettings = (role: string) => {
  return true;
};

export const getPaymentChildActiveIndex = (role: string, child: string) => {
  switch (child) {
    case "transactions":
      return 0;
    case "payment-channels": {
      return canViewPaymentTransactions(role) ? 1 : 0;
    }
    case "invoice-management": {
      const transactions = canViewPaymentTransactions(role);
      const channels = canViewPaymentChannels(role);
      if (!transactions && !channels) return 0;
      if (transactions && !channels) return 1;
      if (transactions && channels) return 2;
    }
    case "refund-processing": {
      const transactions = canViewPaymentTransactions(role);
      const channels = canViewPaymentChannels(role);
      const invoices = canViewPaymentInvoices(role);
      if (!transactions && !channels && !invoices) return 0;
      if (transactions && !channels && !invoices) return 1;
      if (transactions && channels && !invoices) return 2;
      if (transactions && channels && invoices) return 3;
    }
  }
  return -1;
};

export const getUsersChildActiveIndex = (role: string, child: string) => {
  if (child === "tax-payers") return 0;
  if (child === "admin-users") {
    return canViewTaxPayers(role) ? 1 : 0;
  }
  return -1;
};

export const getDashboardActiveChildIndex = (role: string, parent?: string) => {
  if (parent === undefined) return 0;
  if (parent === "informal-sector") {
    return canViewDashboard(role) ? 1 : 0;
  }
  if (parent === "formal-sector") {
    const dashboard = canViewDashboard(role);
    const informal = canViewDashboardInformalSector(role);
    if (!dashboard && !informal) return 0;
    if (dashboard && !informal) return 1;
    if (dashboard && informal) return 2;
  }
  return -1;
};

export const canViewTargetPage = (role: string, path: string) => {
  if (path === "/dashboard") {
    return canViewDashboard(role);
  } else if (path.startsWith("/dashboard/formal-sector")) {
    return canViewDashboardFormalSector(role);
  } else if (path.startsWith("/dashboard/informal-sector")) {
    return canViewDashboardInformalSector(role);
  } else if (path.startsWith("/dashboard/payments/transactions")) {
    return canViewPaymentTransactions(role);
  } else if (path.startsWith("/dashboard/payments/payment-channels")) {
    return canViewPaymentChannels(role);
  } else if (path.startsWith("/dashboard/payments/invoice-management")) {
    return canViewPaymentInvoices(role);
  } else if (path.startsWith("/dashboard/organizations")) {
    return canViewOrganizations(role);
  } else if (path.startsWith("/dashboard/objections")) {
    return canViewObjections(role);
  } else if (path.startsWith("/dashboard/users/admin-users")) {
    return canViewAdminUsers(role);
  } else if (path.startsWith("/dashboard/users/tax-payers")) {
    return canViewTaxPayers(role);
  } else if (path.startsWith("/dashboard/users")) {
    return canViewUsers(role);
  } else if (path.startsWith("/dashboard/reports")) {
    return canViewReports(role);
  } else if (path.startsWith("/dashboard/support")) {
    return canViewSupport(role);
  } else if (path.startsWith("/dashboard/settings")) {
    return canViewSettings(role);
  }

  return true;
};

export const canCreateNewUser = (role: string) => {
  return (
    role === ROLE_ADMIN ||
    role === ROLE_SUB_ADMIN_1 ||
    role === ROLE_SUB_ADMIN_2 ||
    role === ROLE_SUB_ADMIN_3
  );
};
