import React, { useState, useEffect } from 'react';
import { client, alpha } from '../graphql/default_profile';

const myProfile = () => {
	const [profile, setProfile] = useState('');
	useEffect(() => {
		fetchProfile();
	}, []);

	const fetchProfile = async () => {
		try {
			/* fetch profiles from Lens API */
			let response = await client.query({ query: alpha });
			console.log('printing response');
			console.log(response);
			let picture = response.data.defaultProfile.picture;
			if (picture && picture.original && picture.original.url) {
				if (picture.original.url.startsWith('ipfs://')) {
					let result = picture.original.url.substring(
						7,
						picture.original.url.length
					);
					picture = `http://lens.infura-ipfs.io/ipfs/${result}`;
				} else {
					picture = picture.original.url;
				}
			}
			// {
			//   "data": {
			//     "defaultProfile": {
			//       "id": "0x0f",
			//       "name": null,
			//       "bio": null,
			//       "picture": {
			//         "original": {
			//           "url": "https://ipfs.infura.io/ipfs/Qma8mXoeorvPqodDazf7xqARoFD394s1njkze7q1X4CK8U",
			//           "mimeType": null
			//         }
			//       },
			//     }
			//   }
			// }

			setProfile({
				id: response.data.defaultProfile.id,
				name: response.data.defaultProfile.name,
				bio: response.data.defaultProfile.bio,
				pic: picture,
			});
			/* update the local state with the profiles array */
		} catch (err) {
			console.log('Error occurred:');
			console.log({ err });
		}
	};
	profile;
	return (
		<div>
			<div>
				Profile of the address: 0x3A5bd1E37b099aE3386D13947b6a90d97675e5e3
			</div>
			<div>
				{profile && (
					<div>
						<div>id:{profile.id}</div>
						<div>
							name:{profile.name}
							name:{profile.name}
						</div>
						bio:{profile.bio}
						<div>
							<img
								className="w-48"
								src={profile.pic || 'https://picsum.photos/200'}
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default myProfile;
