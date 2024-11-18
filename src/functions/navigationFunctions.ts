export const ROLE_AGENT: string = "Agent";
export const ROLE_INDIVIDUAL: string = "Individual";
export const ROLE_NON_INDIVIDUAL: string = "Non-Individual";
export const ROLE_BANK_STAFF: string = "Bank-Staff";

export const determineFirstPage = (role: string) => {
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
    role !== ROLE_AGENT &&
    role !== ROLE_BANK_STAFF &&
    role !== ROLE_INDIVIDUAL &&
    role !== ROLE_NON_INDIVIDUAL
  );
};

export const canViewDashboardOverview = (role: string) => {
  return (
    role !== "" &&
    role !== ROLE_AGENT &&
    role !== ROLE_BANK_STAFF &&
    role !== ROLE_INDIVIDUAL &&
    role !== ROLE_NON_INDIVIDUAL
  );
};

export const canViewDashboardFormalSector = (role: string) => {
  return (
    role !== "" &&
    role !== ROLE_AGENT &&
    role !== ROLE_BANK_STAFF &&
    role !== ROLE_INDIVIDUAL &&
    role !== ROLE_NON_INDIVIDUAL
  );
};

export const canViewDashboardInformalSector = (role: string) => {
  return (
    role !== "" &&
    role !== ROLE_AGENT &&
    role !== ROLE_BANK_STAFF &&
    role !== ROLE_INDIVIDUAL &&
    role !== ROLE_NON_INDIVIDUAL
  );
};

export const canViewPayments = (role: string) => {
  return true;
};

export const canViewPaymentTransactions = (role: string) => {
  return true;
};

export const canViewPaymentChannels = (role: string) => {
  return (
    role !== "" &&
    role !== ROLE_AGENT &&
    role !== ROLE_BANK_STAFF &&
    role !== ROLE_INDIVIDUAL &&
    role !== ROLE_NON_INDIVIDUAL
  );
};

export const canViewPaymentInvoices = (role: string) => {
  return true;
};

export const canViewPaymentRefunds = (role: string) => {
  return (
    role !== "" &&
    role !== ROLE_AGENT &&
    role !== ROLE_BANK_STAFF &&
    role !== ROLE_INDIVIDUAL &&
    role !== ROLE_NON_INDIVIDUAL
  );
};

export const canViewOrganizations = (role: string) => {
  return (
    role !== "" &&
    role !== ROLE_AGENT &&
    role !== ROLE_BANK_STAFF &&
    role !== ROLE_INDIVIDUAL &&
    role !== ROLE_NON_INDIVIDUAL
  );
};

export const canViewObjections = (role: string) => {
  return (
    role !== "" &&
    role !== ROLE_AGENT &&
    role !== ROLE_BANK_STAFF &&
    role !== ROLE_INDIVIDUAL &&
    role !== ROLE_NON_INDIVIDUAL
  );
};

export const canViewUsers = (role: string) => {
  return (
    role !== "" &&
    role !== ROLE_AGENT &&
    role !== ROLE_BANK_STAFF &&
    role !== ROLE_INDIVIDUAL &&
    role !== ROLE_NON_INDIVIDUAL
  );
};

export const canViewAdminUsers = (role: string) => {
  return (
    role !== "" &&
    role !== ROLE_AGENT &&
    role !== ROLE_BANK_STAFF &&
    role !== ROLE_INDIVIDUAL &&
    role !== ROLE_NON_INDIVIDUAL
  );
};

export const canViewTaxPayers = (role: string) => {
  return (
    role !== "" &&
    role !== ROLE_AGENT &&
    role !== ROLE_BANK_STAFF &&
    role !== ROLE_INDIVIDUAL &&
    role !== ROLE_NON_INDIVIDUAL
  );
};

export const canViewReports = (role: string) => {
  return (
    role !== "" &&
    role !== ROLE_AGENT &&
    role !== ROLE_BANK_STAFF &&
    role !== ROLE_INDIVIDUAL &&
    role !== ROLE_NON_INDIVIDUAL
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

export const canViewTargetPage = (path: string) => {
  // CHeck for each path with the corresponding function
  return true;
};
