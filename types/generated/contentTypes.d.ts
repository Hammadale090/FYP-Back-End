import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    client_profile: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'api::client-profile.client-profile'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAgencyAgency extends Schema.CollectionType {
  collectionName: 'agencies';
  info: {
    singularName: 'agency';
    pluralName: 'agencies';
    displayName: 'Agency';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    client_profile: Attribute.Relation<
      'api::agency.agency',
      'oneToOne',
      'api::client-profile.client-profile'
    >;
    professional_profile: Attribute.Relation<
      'api::agency.agency',
      'oneToOne',
      'api::professional-profile.professional-profile'
    >;
    Agency_name: Attribute.String;
    Agency_bio: Attribute.Text;
    Expertise: Attribute.String;
    Tax_number: Attribute.String;
    Service_area: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::agency.agency',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::agency.agency',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiArticleArticle extends Schema.CollectionType {
  collectionName: 'articles';
  info: {
    singularName: 'article';
    pluralName: 'articles';
    displayName: 'Article';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    client_profile: Attribute.Relation<
      'api::article.article',
      'manyToOne',
      'api::client-profile.client-profile'
    >;
    professional_profile: Attribute.Relation<
      'api::article.article',
      'manyToOne',
      'api::professional-profile.professional-profile'
    >;
    title: Attribute.String;
    description: Attribute.Text;
    body: Attribute.Blocks;
    article_banner: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::article.article',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::article.article',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCertificationCertification extends Schema.CollectionType {
  collectionName: 'certifications';
  info: {
    singularName: 'certification';
    pluralName: 'certifications';
    displayName: 'Certification';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    client_profile: Attribute.Relation<
      'api::certification.certification',
      'manyToOne',
      'api::client-profile.client-profile'
    >;
    professional_profile: Attribute.Relation<
      'api::certification.certification',
      'manyToOne',
      'api::professional-profile.professional-profile'
    >;
    type: Attribute.Enumeration<['Award', 'Certification']>;
    name: Attribute.String;
    issued_by: Attribute.String;
    issue_date: Attribute.Date;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::certification.certification',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::certification.certification',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiClientProfileClientProfile extends Schema.CollectionType {
  collectionName: 'client_profiles';
  info: {
    singularName: 'client-profile';
    pluralName: 'client-profiles';
    displayName: 'clientProfile';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    role: Attribute.Enumeration<
      ['user', 'broker', 'realtor', 'real estate laywer']
    >;
    user: Attribute.Relation<
      'api::client-profile.client-profile',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    first_name: Attribute.String;
    last_name: Attribute.String;
    location: Attribute.String;
    address: Attribute.String;
    zip: Attribute.String;
    state: Attribute.String;
    gender: Attribute.Enumeration<['male', 'female']>;
    birthday: Attribute.Date;
    profile_pic: Attribute.Media;
    phone: Attribute.String;
    professional_profile: Attribute.Relation<
      'api::client-profile.client-profile',
      'oneToOne',
      'api::professional-profile.professional-profile'
    >;
    agency: Attribute.Relation<
      'api::client-profile.client-profile',
      'oneToOne',
      'api::agency.agency'
    >;
    events: Attribute.Relation<
      'api::client-profile.client-profile',
      'oneToMany',
      'api::event.event'
    >;
    testimonials: Attribute.Relation<
      'api::client-profile.client-profile',
      'oneToMany',
      'api::testimonial.testimonial'
    >;
    submitted_testimonials: Attribute.Relation<
      'api::client-profile.client-profile',
      'oneToMany',
      'api::testimonial.testimonial'
    >;
    listings: Attribute.Relation<
      'api::client-profile.client-profile',
      'oneToMany',
      'api::listing.listing'
    >;
    services: Attribute.Relation<
      'api::client-profile.client-profile',
      'oneToMany',
      'api::service.service'
    >;
    portfolios: Attribute.Relation<
      'api::client-profile.client-profile',
      'oneToMany',
      'api::portfolio.portfolio'
    >;
    articles: Attribute.Relation<
      'api::client-profile.client-profile',
      'oneToMany',
      'api::article.article'
    >;
    certifications: Attribute.Relation<
      'api::client-profile.client-profile',
      'oneToMany',
      'api::certification.certification'
    >;
    preference: Attribute.Relation<
      'api::client-profile.client-profile',
      'oneToOne',
      'api::preference.preference'
    >;
    favourites: Attribute.JSON;
    views: Attribute.JSON;
    stripeCustomerId: Attribute.String;
    stripeSubscriptionId: Attribute.String;
    stripePriceId: Attribute.String;
    stripeCurrentPeriodEnd: Attribute.Date;
    planId: Attribute.String;
    reviews: Attribute.Relation<
      'api::client-profile.client-profile',
      'oneToMany',
      'api::review.review'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::client-profile.client-profile',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::client-profile.client-profile',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEventEvent extends Schema.CollectionType {
  collectionName: 'events';
  info: {
    singularName: 'event';
    pluralName: 'events';
    displayName: 'event';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    client_profile: Attribute.Relation<
      'api::event.event',
      'manyToOne',
      'api::client-profile.client-profile'
    >;
    professional_profile: Attribute.Relation<
      'api::event.event',
      'manyToOne',
      'api::professional-profile.professional-profile'
    >;
    location: Attribute.String;
    event_type: Attribute.String;
    dates: Attribute.JSON;
    listing: Attribute.Relation<
      'api::event.event',
      'oneToOne',
      'api::listing.listing'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::event.event',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::event.event',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiListingListing extends Schema.CollectionType {
  collectionName: 'listings';
  info: {
    singularName: 'listing';
    pluralName: 'listings';
    displayName: 'Listing';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    price: Attribute.BigInteger;
    predictedPrice: Attribute.String;
    safetyRatings: Attribute.String;
    location: Attribute.String;
    coverPhoto: Attribute.Media;
    Gallery: Attribute.Media;
    overview: Attribute.Component<'overview.overview'>;
    description: Attribute.Text;
    additional_information: Attribute.Component<'additional-information.additional-information'>;
    address: Attribute.String;
    city: Attribute.String;
    state: Attribute.String;
    zip: Attribute.String;
    area: Attribute.String;
    country: Attribute.String;
    energy_efficiency_metrics: Attribute.Component<'energy-efficiency-metrics.energy-efficiency-metrics'>;
    interactiveFloorPlans: Attribute.Component<'interactive-floor-plans.interactive-floor-plans'>;
    user_generated_showcase: Attribute.Media;
    furnitureSugesstions: Attribute.Component<'furniture-sugesstions.furniture-sugesstions'>;
    features: Attribute.JSON;
    videoUrl: Attribute.String;
    views: Attribute.JSON;
    favourites: Attribute.JSON;
    professional_profile: Attribute.Relation<
      'api::listing.listing',
      'manyToOne',
      'api::professional-profile.professional-profile'
    >;
    client_profile: Attribute.Relation<
      'api::listing.listing',
      'manyToOne',
      'api::client-profile.client-profile'
    >;
    event: Attribute.Relation<
      'api::listing.listing',
      'oneToOne',
      'api::event.event'
    >;
    status: Attribute.Enumeration<['active', 'sold']>;
    isFeatured: Attribute.Boolean & Attribute.DefaultTo<false>;
    invites: Attribute.Relation<
      'api::listing.listing',
      'manyToMany',
      'api::professional-profile.professional-profile'
    >;
    latitude: Attribute.String;
    longitude: Attribute.String;
    galleryWithUrls: Attribute.JSON;
    coverPhotoFromUrl: Attribute.Text;
    currency: Attribute.String;
    type: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::listing.listing',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::listing.listing',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiListingInviteListingInvite extends Schema.CollectionType {
  collectionName: 'listing_invites';
  info: {
    singularName: 'listing-invite';
    pluralName: 'listing-invites';
    displayName: 'ListingInvite';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    listing: Attribute.Relation<
      'api::listing-invite.listing-invite',
      'oneToOne',
      'api::listing.listing'
    >;
    invited_professional: Attribute.Relation<
      'api::listing-invite.listing-invite',
      'oneToOne',
      'api::professional-profile.professional-profile'
    >;
    referrer_code: Attribute.String;
    listing_owner: Attribute.Relation<
      'api::listing-invite.listing-invite',
      'oneToOne',
      'api::professional-profile.professional-profile'
    >;
    status: Attribute.Enumeration<['pending', 'accepted', 'rejected']>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::listing-invite.listing-invite',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::listing-invite.listing-invite',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiNewsletterNewsletter extends Schema.CollectionType {
  collectionName: 'newsletters';
  info: {
    singularName: 'newsletter';
    pluralName: 'newsletters';
    displayName: 'Newsletter';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    email: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::newsletter.newsletter',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::newsletter.newsletter',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPortfolioPortfolio extends Schema.CollectionType {
  collectionName: 'portfolios';
  info: {
    singularName: 'portfolio';
    pluralName: 'portfolios';
    displayName: 'Portfolio';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    client_profile: Attribute.Relation<
      'api::portfolio.portfolio',
      'manyToOne',
      'api::client-profile.client-profile'
    >;
    professional_profile: Attribute.Relation<
      'api::portfolio.portfolio',
      'manyToOne',
      'api::professional-profile.professional-profile'
    >;
    name: Attribute.String;
    description: Attribute.Text;
    location: Attribute.String;
    price: Attribute.String;
    Gallery: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::portfolio.portfolio',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::portfolio.portfolio',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPreferencePreference extends Schema.CollectionType {
  collectionName: 'preferences';
  info: {
    singularName: 'preference';
    pluralName: 'preferences';
    displayName: 'preference';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    client_profile: Attribute.Relation<
      'api::preference.preference',
      'oneToOne',
      'api::client-profile.client-profile'
    >;
    homeWarranty: Attribute.Enumeration<
      ['All Warranties', 'Home Warranty Available', 'Home Warranty Unavailable']
    >;
    filterByFurnished: Attribute.Enumeration<
      ['Furnished Properties', 'Unfurnished Properties']
    >;
    propertyAmenities: Attribute.JSON;
    architecturalStyles: Attribute.JSON;
    virtualTours: Attribute.Enumeration<['Virtual Tours Only', 'All Listings']>;
    propertyType: Attribute.Enumeration<
      ['For Sale', 'For Rent', 'New Construction', 'Recently Sold']
    >;
    closeProximities: Attribute.JSON;
    homeTypes: Attribute.JSON;
    min_priceRange: Attribute.BigInteger & Attribute.DefaultTo<0>;
    max_priceRange: Attribute.BigInteger & Attribute.DefaultTo<0>;
    min_constructionDateRange: Attribute.Date;
    max_constructionDateRange: Attribute.Date;
    min_sizeConsiderationsRange: Attribute.BigInteger & Attribute.DefaultTo<0>;
    max_sizeConsiderationsRange: Attribute.BigInteger & Attribute.DefaultTo<0>;
    propertyCategory: Attribute.Enumeration<
      ['House', 'Apartment', 'Condo', 'Townhouse', 'Land', 'Commercial']
    >;
    location: Attribute.JSON;
    specific_keywords_or_phrases: Attribute.JSON & Attribute.DefaultTo<[]>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::preference.preference',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::preference.preference',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProfessionalPreferenceProfessionalPreference
  extends Schema.CollectionType {
  collectionName: 'professional_preferences';
  info: {
    singularName: 'professional-preference';
    pluralName: 'professional-preferences';
    displayName: 'professional_preference';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    propertySpecialization: Attribute.JSON &
      Attribute.DefaultTo<{
        residential: false;
        commercial: false;
        luxury: false;
        mixedUse: false;
      }>;
    preferredPropertyTypes: Attribute.JSON &
      Attribute.DefaultTo<{
        singleFamilyHomes: false;
        condos: false;
        officeSpaces: false;
        retailSpaces: false;
        industrialProperties: false;
      }>;
    min_priceRange: Attribute.BigInteger & Attribute.DefaultTo<0>;
    max_priceRange: Attribute.BigInteger & Attribute.DefaultTo<0>;
    geographicAreas: Attribute.JSON &
      Attribute.DefaultTo<{
        cityCenter: false;
        suburbs: false;
        ruralAreas: false;
        specificNeighborhoods: false;
      }>;
    excellingRegions: Attribute.JSON;
    min_idealClientDemographicsAge: Attribute.BigInteger &
      Attribute.DefaultTo<0>;
    max_idealClientDemographicsAge: Attribute.BigInteger &
      Attribute.DefaultTo<0>;
    min_idealClientDemographicsIncome: Attribute.BigInteger &
      Attribute.DefaultTo<0>;
    max_idealClientDemographicsIncome: Attribute.BigInteger &
      Attribute.DefaultTo<0>;
    idealClientDemographicsFamilyStatus: Attribute.JSON &
      Attribute.DefaultTo<{
        single: false;
        married: false;
        divorced: false;
        inARelationship: false;
      }>;
    idealClientDemographicsOccupation: Attribute.JSON &
      Attribute.DefaultTo<{
        healthcare: false;
        education: false;
        engineering: false;
        informationTechnology: false;
        finance: false;
        law: false;
        salesAndMarketing: false;
        construction: false;
        manufacturing: false;
        artsAndEntertainment: false;
        scienceAndResearch: false;
        publicServiceAndGovernment: false;
        transportationAndLogistics: false;
        hospitalityAndTourism: false;
        agriculture: false;
      }>;
    clientSpecialization: Attribute.JSON &
      Attribute.DefaultTo<{
        firstTimeHomebuyers: false;
        retirees: false;
        investors: false;
        relocatingClients: false;
      }>;
    commonClientNeeds: Attribute.JSON &
      Attribute.DefaultTo<{
        investmentProperties: false;
        relocation: false;
        downsizing: false;
        upgrading: false;
      }>;
    specificClientPreferences: Attribute.JSON &
      Attribute.DefaultTo<{
        ecoFriendlyHomes: false;
        historicProperties: false;
        accessibleProperties: false;
        smartHomes: false;
      }>;
    communicationPreferences: Attribute.JSON &
      Attribute.DefaultTo<{
        phoneCalls: false;
        emails: false;
        textMessages: false;
        inPersonMeetings: false;
        videoCalls: false;
      }>;
    communicationTools: Attribute.JSON &
      Attribute.DefaultTo<{
        crmSoftware: false;
        emailMarketingPlatforms: false;
        virtualMeetingTools: false;
      }>;
    additionalServices: Attribute.JSON &
      Attribute.DefaultTo<{
        staging: false;
        propertyManagement: false;
        investmentAnalysis: false;
        marketResearch: false;
      }>;
    valueAddedServices: Attribute.JSON &
      Attribute.DefaultTo<{
        homeRenovationConsultation: false;
        legalAssistance: false;
        financialPlanningServices: false;
      }>;
    marketingStrategies: Attribute.JSON &
      Attribute.DefaultTo<{
        onlineAdvertising: false;
        socialMediaMarketing: false;
        openHouses: false;
        printAdvertising: false;
      }>;
    successfulMarketingChannels: Attribute.JSON &
      Attribute.DefaultTo<{
        facebookAds: false;
        instagramMarketing: false;
        localEventsSponsorship: false;
      }>;
    clientRelationshipManagement: Attribute.JSON &
      Attribute.DefaultTo<{
        regularFollowUps: false;
        clientAppreciationEvents: false;
        referralPrograms: false;
      }>;
    postTransactionFollowUp: Attribute.JSON &
      Attribute.DefaultTo<{
        quarterlyNewsletters: false;
        annualCheckIns: false;
        specialOccasionGreetings: false;
      }>;
    professionalExperience: Attribute.JSON & Attribute.DefaultTo<[]>;
    specializedCertifications: Attribute.JSON & Attribute.DefaultTo<[]>;
    goalsExpectations: Attribute.JSON &
      Attribute.DefaultTo<{
        leadConversionRate: false;
        clientSatisfaction: false;
        transactionVolume: false;
      }>;
    measuringSuccess: Attribute.JSON &
      Attribute.DefaultTo<{
        positiveReviewsTestimonials: false;
        repeatBusiness: false;
        referralRate: false;
      }>;
    professional_profile: Attribute.Relation<
      'api::professional-preference.professional-preference',
      'oneToOne',
      'api::professional-profile.professional-profile'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::professional-preference.professional-preference',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::professional-preference.professional-preference',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProfessionalProfileProfessionalProfile
  extends Schema.CollectionType {
  collectionName: 'professional_profiles';
  info: {
    singularName: 'professional-profile';
    pluralName: 'professional-profiles';
    displayName: 'ProfessionalProfile';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    client_profile: Attribute.Relation<
      'api::professional-profile.professional-profile',
      'oneToOne',
      'api::client-profile.client-profile'
    >;
    Banner_photo: Attribute.Media;
    full_name: Attribute.String;
    Experience: Attribute.String;
    phone: Attribute.String;
    email: Attribute.String;
    city: Attribute.String;
    professional_photo: Attribute.Media;
    url_link: Attribute.String;
    profile_logo: Attribute.Media;
    brand_color: Attribute.String;
    Custom_cta_button: Attribute.String;
    agency: Attribute.Relation<
      'api::professional-profile.professional-profile',
      'oneToOne',
      'api::agency.agency'
    >;
    events: Attribute.Relation<
      'api::professional-profile.professional-profile',
      'oneToMany',
      'api::event.event'
    >;
    testimonials: Attribute.Relation<
      'api::professional-profile.professional-profile',
      'oneToMany',
      'api::testimonial.testimonial'
    >;
    listings: Attribute.Relation<
      'api::professional-profile.professional-profile',
      'oneToMany',
      'api::listing.listing'
    >;
    services: Attribute.Relation<
      'api::professional-profile.professional-profile',
      'oneToMany',
      'api::service.service'
    >;
    portfolios: Attribute.Relation<
      'api::professional-profile.professional-profile',
      'oneToMany',
      'api::portfolio.portfolio'
    >;
    articles: Attribute.Relation<
      'api::professional-profile.professional-profile',
      'oneToMany',
      'api::article.article'
    >;
    certifications: Attribute.Relation<
      'api::professional-profile.professional-profile',
      'oneToMany',
      'api::certification.certification'
    >;
    social_links: Attribute.JSON;
    professional_preference: Attribute.Relation<
      'api::professional-profile.professional-profile',
      'oneToOne',
      'api::professional-preference.professional-preference'
    >;
    invited: Attribute.Relation<
      'api::professional-profile.professional-profile',
      'manyToMany',
      'api::listing.listing'
    >;
    promo_code: Attribute.String;
    promo_text: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::professional-profile.professional-profile',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::professional-profile.professional-profile',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiReferralReferral extends Schema.CollectionType {
  collectionName: 'referrals';
  info: {
    singularName: 'referral';
    pluralName: 'referrals';
    displayName: 'Referral';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    referrer_id: Attribute.String;
    referee_email: Attribute.String;
    referral_code: Attribute.String;
    status: Attribute.Enumeration<['Pending', 'Accepted', 'Rejected']>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::referral.referral',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::referral.referral',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiRequestVisitRequestVisit extends Schema.CollectionType {
  collectionName: 'request_visits';
  info: {
    singularName: 'request-visit';
    pluralName: 'request-visits';
    displayName: 'RequestVisit';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    first_name: Attribute.String;
    email: Attribute.String;
    date: Attribute.Date;
    time: Attribute.Time;
    message: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::request-visit.request-visit',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::request-visit.request-visit',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiReviewReview extends Schema.CollectionType {
  collectionName: 'reviews';
  info: {
    singularName: 'review';
    pluralName: 'reviews';
    displayName: 'review';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    email: Attribute.Email;
    title: Attribute.String;
    rating: Attribute.Enumeration<
      [
        'Star 1 - Poor',
        'Star 2 - Fair',
        'Star 3  - Average',
        'Star 4 - Good',
        'Star 5 - Excellent'
      ]
    >;
    videoUrl: Attribute.String;
    video: Attribute.Media;
    review: Attribute.Text;
    professional: Attribute.Relation<
      'api::review.review',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    client_profile: Attribute.Relation<
      'api::review.review',
      'manyToOne',
      'api::client-profile.client-profile'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::review.review',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::review.review',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiServiceService extends Schema.CollectionType {
  collectionName: 'services';
  info: {
    singularName: 'service';
    pluralName: 'services';
    displayName: 'Service';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    client_profile: Attribute.Relation<
      'api::service.service',
      'manyToOne',
      'api::client-profile.client-profile'
    >;
    professional_profile: Attribute.Relation<
      'api::service.service',
      'manyToOne',
      'api::professional-profile.professional-profile'
    >;
    description: Attribute.Text;
    location: Attribute.String;
    price: Attribute.String;
    Gallery: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::service.service',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::service.service',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSubscriptionSubscription extends Schema.CollectionType {
  collectionName: 'subscriptions';
  info: {
    singularName: 'subscription';
    pluralName: 'subscriptions';
    displayName: 'Subscription';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    subTitle: Attribute.String;
    price: Attribute.Decimal;
    benefits: Attribute.JSON;
    totalDowloads: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::subscription.subscription',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::subscription.subscription',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTestimonialTestimonial extends Schema.CollectionType {
  collectionName: 'testimonials';
  info: {
    singularName: 'testimonial';
    pluralName: 'testimonials';
    displayName: 'Testimonial';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    body: Attribute.Text;
    rating: Attribute.String;
    client_profile: Attribute.Relation<
      'api::testimonial.testimonial',
      'manyToOne',
      'api::client-profile.client-profile'
    >;
    professional_profile: Attribute.Relation<
      'api::testimonial.testimonial',
      'manyToOne',
      'api::professional-profile.professional-profile'
    >;
    testimonial_user: Attribute.Relation<
      'api::testimonial.testimonial',
      'manyToOne',
      'api::client-profile.client-profile'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::testimonial.testimonial',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::testimonial.testimonial',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::agency.agency': ApiAgencyAgency;
      'api::article.article': ApiArticleArticle;
      'api::certification.certification': ApiCertificationCertification;
      'api::client-profile.client-profile': ApiClientProfileClientProfile;
      'api::event.event': ApiEventEvent;
      'api::listing.listing': ApiListingListing;
      'api::listing-invite.listing-invite': ApiListingInviteListingInvite;
      'api::newsletter.newsletter': ApiNewsletterNewsletter;
      'api::portfolio.portfolio': ApiPortfolioPortfolio;
      'api::preference.preference': ApiPreferencePreference;
      'api::professional-preference.professional-preference': ApiProfessionalPreferenceProfessionalPreference;
      'api::professional-profile.professional-profile': ApiProfessionalProfileProfessionalProfile;
      'api::referral.referral': ApiReferralReferral;
      'api::request-visit.request-visit': ApiRequestVisitRequestVisit;
      'api::review.review': ApiReviewReview;
      'api::service.service': ApiServiceService;
      'api::subscription.subscription': ApiSubscriptionSubscription;
      'api::testimonial.testimonial': ApiTestimonialTestimonial;
    }
  }
}
