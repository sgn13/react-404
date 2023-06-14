import { storiesOf } from "@storybook/react";

storiesOf("Components/ImageInput", module)
  .add("single", () => <imgInput label="Profile Picture" name="profile_picture" />)
  .add("multiple", () => <imgInput multiple label="Profile Picture" name="profile_picture" />)
  .add("error", () => (
    <imgInput
      label="Profile Picture"
      name="profile_picture"
      errors={{ profile_picture: "Profile Picture is required field." }}
      errorStyle={{ marginTop: 0 }}
    />
  ))
  .add("Http Urls", () => (
    <imgInput
      multiple={false}
      label="Profile Picture"
      name="profile_picture"
      //       onChange={(filelist) => setFieldValue("profile_picture", filelist)}
      //     value={[values.profile_picture]}
      value={[
        {
          id: 1,
          url: "https://farm9.staticflickr.com/8505/8441256181_4e98d8bff5_z_d.jpg",
          name: "8441256181_4e98d8bff5_z_d.jpg",
        },
      ]}
    />
  ));
