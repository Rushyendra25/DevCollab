export const calculateProfileCompletion = (user) => {
    if (!user) return 0;
  
    const profileFields = [
      "name",
      "email",
      "location",
      "experience",
      "bio",
      "github",
      "linkedin",
      "portfolio",
      "skills",
    ];
  
    let completed = 0;
  
    profileFields.forEach((field) => {
      const value = user[field];
  
      if (Array.isArray(value)) {
        if (value.length > 0) completed++;
      } else if (
        value !== undefined &&
        value !== null &&
        value !== ""
      ) {
        completed++;
      }
    });
  
    return Math.round(
      (completed / profileFields.length) * 100
    );
  };