import { createClient } from "urql";

const client = token => createClient({
  url: process.env.NEXT_PUBLIC_FAUNA_DOMAIN,
  fetchOptions: () => {
    return {
      headers: { authorization: token ? `Bearer ${token}` : '' },
    };
  },
});

export { client };

