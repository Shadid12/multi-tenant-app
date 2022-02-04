import { createClient } from "urql";

const client = token => createClient({
  url: process.env.FAUNA_DOMAIN,
  fetchOptions: () => {
    return {
      headers: { authorization: token ? `Bearer ${token}` : '' },
    };
  },
});

export { client };

