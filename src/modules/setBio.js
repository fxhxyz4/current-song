import { Api } from "telegram";

const setBio = async (client, bio) => {
  await client.invoke(
    new Api.account.UpdateProfile({
      about: bio.slice(0, 70),
    }),
  );
};

export { setBio };
