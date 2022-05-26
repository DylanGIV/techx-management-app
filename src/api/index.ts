import axios from './axiosConfig';

export const postLogin = async (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    axios
      .post('Accounts/authenticate', {
        email: email,
        password: password
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

export const postRegister = async (company: string, firstName: string, lastName: string, email: string, password: string, confirmPassword: string, acceptTerms: Boolean) => {
  return new Promise((resolve, reject) => {
    axios
      .post('Accounts/register', {
        company: company,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        acceptTerms: acceptTerms
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

export const postRefreshToken = async () => {
  return new Promise((resolve, reject) => {
    axios
      .post('Accounts/refresh-token')
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

export const postCreateCompany = async (companyName : string) => {
  return new Promise((resolve, reject) => {
    axios
      .post('Company/create', {
        companyName: companyName
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

// needs to be revised
export const postAddEmployeeToCompany = async (companyId: number, accountIds: [number]) => {
  return new Promise((resolve, reject) => {
    axios
      .post('Company/add', {
        companyId: companyId,
        accountIds: accountIds
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

export const getAllCompanies = async () => {
  return new Promise((resolve, reject) => {
    axios
      .get('Company/all')
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

export const getCompaniesByAccount = async () => {
  return new Promise((resolve, reject) => {
    axios
      .get('Company/employee')
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

export const postCreateProject = async (companyId: number, projectName: string, projectDescription: string) => {
  return new Promise((resolve, reject) => {
    axios
      .post('Project/create', {
        companyId: companyId,
        projectName: projectName,
        projectDescription: projectDescription
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

export const PutUpdateProjectTeam = async (projectId: number, teamId: number) => {
  return new Promise((resolve, reject) => {
    axios
      .put('Project/team', {
        projectId: projectId,
        teamId: teamId
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

export const deleteProject = async (projectId: number) => {
  return new Promise((resolve, reject) => {
    axios
      .delete('Project/delete', {
        data: {
          projectId: projectId
        }
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

export const getProjectsByCompanyId = async (companyId: number) => {
  return new Promise((resolve, reject) => {
    axios
      .get('Project/companyId', {
        params: {
          companyId: companyId
        }
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

export const postCreateTeam = async (teamName: string, companyId: number) => {
  return new Promise((resolve, reject) => {
    axios
      .post('Team/create', {
        teamName: teamName,
        companyId: companyId
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

export const putUpdateTeamName = async (teamId: number, teamName: string) => {
  return new Promise((resolve, reject) => {
    axios
      .put('Team/update', {
        teamId: teamId,
        teamName: teamName
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

export const getTeamsByCompanyId = async (companyId: number) => {
  return new Promise((resolve, reject) => {
    axios
      .get('Team/companyId', {
        params: {
          companyId: companyId
        }
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};
