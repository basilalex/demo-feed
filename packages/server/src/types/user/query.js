export const query = {
  async user(parent, { id }, { identity }) {
    return identity;
  },
};
