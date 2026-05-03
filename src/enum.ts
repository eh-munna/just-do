enum UserRoles {
  Admin = 'Admin',
  Moderator = 'Moderator',
  User = 'User',
}

const canAccessAdminPanel = (role: UserRoles) => {
  if (role === UserRoles.Admin) {
    console.log(`"${UserRoles.Admin}" can access and has super power`);
  } else if (role === UserRoles.Moderator) {
    console.log(`"${UserRoles.Moderator}" can access but with power`);
  } else {
    console.log(`"${UserRoles.User}" cannot access!`);
  }
};

canAccessAdminPanel(UserRoles.Admin);
canAccessAdminPanel(UserRoles.Moderator);
canAccessAdminPanel(UserRoles.User);
