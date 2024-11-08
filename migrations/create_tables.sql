CREATE TABLE artists (
    uid VARCHAR(255) PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    about TEXT DEFAULT '',
    avatar VARCHAR(255) DEFAULT 'https://i.pinimg.com/474x/65/9d/5f/659d5fd2b1f5ce399fd6f15ac7b3c02b.jpg',
    color VARCHAR(7) DEFAULT '#9f6eff',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE models (
    uid VARCHAR(255) PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    file VARCHAR(255) NOT NULL,
    about TEXT DEFAULT 'rawr XD',
    artists VARCHAR(255)[] DEFAULT '{}',
    thumbnail VARCHAR(255) DEFAULT 'https://i.pinimg.com/474x/65/9d/5f/659d5fd2b1f5ce399fd6f15ac7b3c02b.jpg',
    scale_x DECIMAL(10,2) DEFAULT 1.00 CHECK (scale_x >= 0.05 AND scale_x <= 1000.00),
    scale_y DECIMAL(10,2) DEFAULT 1.00 CHECK (scale_y >= 0.05 AND scale_y <= 1000.00),
    scale_z DECIMAL(10,2) DEFAULT 1.00 CHECK (scale_z >= 0.05 AND scale_z <= 1000.00),
    rotation_x DECIMAL(10,2) DEFAULT 0.00 CHECK (rotation_x >= 0.00 AND rotation_x <= 99.99),
    rotation_y DECIMAL(10,2) DEFAULT 0.00 CHECK (rotation_y >= 0.00 AND rotation_y <= 99.99),
    rotation_z DECIMAL(10,2) DEFAULT 0.00 CHECK (rotation_z >= 0.00 AND rotation_z <= 99.99),
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE spaces (
    uid VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    about TEXT DEFAULT '',
    artists VARCHAR(255)[] DEFAULT '{}',
    color VARCHAR(7) DEFAULT '#00ffaa',
    is_public BOOLEAN DEFAULT true,
    thumbnail VARCHAR(255) DEFAULT 'https://i.pinimg.com/474x/65/9d/5f/659d5fd2b1f5ce399fd6f15ac7b3c02b.jpg',
    size_x DECIMAL(10,2) DEFAULT 1.00 CHECK (size_x >= 12.00 AND size_x <= 128.00),
    size_y DECIMAL(10,2) DEFAULT 1.00 CHECK (size_y >= 12.00 AND size_y <= 64.00),
    size_z DECIMAL(10,2) DEFAULT 1.00 CHECK (size_z >= 12.00 AND size_z <= 128.00),
    visits INTEGER DEFAULT 0 CHECK (visits >= 0),
    items VARCHAR(255)[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE items (
    uid VARCHAR(255) PRIMARY KEY,
    space_uid VARCHAR(255) REFERENCES spaces(uid),
    model_uid VARCHAR(255) REFERENCES models(uid),
    artists VARCHAR(255)[] DEFAULT '{}',
    name VARCHAR(255) NOT NULL,
    about TEXT DEFAULT '',
    file VARCHAR(255) NOT NULL,
    thumbnail VARCHAR(255) DEFAULT 'https://i.pinimg.com/474x/65/9d/5f/659d5fd2b1f5ce399fd6f15ac7b3c02b.jpg',
    size_x DECIMAL(10,2) NOT NULL CHECK (size_x >= 0.10 AND size_x <= 100.00),
    size_y DECIMAL(10,2) NOT NULL CHECK (size_y >= 0.10 AND size_y <= 100.00),
    size_z DECIMAL(10,2) NOT NULL CHECK (size_z >= 0.10 AND size_z <= 100.00),
    scale_x DECIMAL(10,2) DEFAULT 100.00 CHECK (scale_x >= 0.05 AND scale_x <= 1000.00),
    scale_y DECIMAL(10,2) DEFAULT 100.00 CHECK (scale_y >= 0.05 AND scale_y <= 1000.00),
    scale_z DECIMAL(10,2) DEFAULT 100.00 CHECK (scale_z >= 0.05 AND scale_z <= 1000.00),
    rotation_x DECIMAL(10,2) DEFAULT 0.00 CHECK (rotation_x >= 0.00 AND rotation_x <= 99.99),
    rotation_y DECIMAL(10,2) DEFAULT 0.00 CHECK (rotation_y >= 0.00 AND rotation_y <= 99.99),
    rotation_z DECIMAL(10,2) DEFAULT 0.00 CHECK (rotation_z >= 0.00 AND rotation_z <= 99.99),
    position_x DECIMAL(10,2) DEFAULT 0.00 CHECK (position_x >= -64.00 AND position_x <= 64.00),
    position_y DECIMAL(10,2) DEFAULT 0.00 CHECK (position_y between 0.00 and 64.00),
    position_z DECIMAL(10,2) DEFAULT 0.00 CHECK (position_z between -64.00 and 64.00),
    is_glowing BOOLEAN DEFAULT false,
    glow_color VARCHAR(7) DEFAULT '#ffffff',
    glow_intensity DECIMAL(10,2) DEFAULT 0.00 CHECK (glow_intensity between 0.00 and 100.00),
    glow_radius DECIMAL(10,2) DEFAULT 0.00 CHECK (glow_radius between 0.00 and 100.00),
    glow_position_x DECIMAL(10,2) DEFAULT 50.00 CHECK (glow_position_x between 0.00 and 100.00),
    glow_position_y DECIMAL(10,2) DEFAULT 50.00 CHECK (glow_position_y between 0.00 and 100.00),
    glow_position_z DECIMAL(10,2) DEFAULT 50.00 CHECK (glow_position_z between 0.00 and 100.00)
);

CREATE TABLE model_artists (
    model_uid VARCHAR(255) REFERENCES models(uid),
    artist_uid VARCHAR(255) REFERENCES artists(uid),
    PRIMARY KEY (model_uid, artist_uid)
);

CREATE TABLE space_artists (
    space_uid VARCHAR(255) REFERENCES spaces(uid),
    artist_uid VARCHAR(255) REFERENCES artists(uid),
    PRIMARY KEY (space_uid, artist_uid)
);

CREATE TABLE space_soundtracks (
    space_uid VARCHAR(255) REFERENCES spaces(uid),
    soundtrack_url VARCHAR(255) NOT NULL,
    position INTEGER NOT NULL,
    PRIMARY KEY (space_uid, position)
);

CREATE TABLE space_assets (
    space_uid VARCHAR(255) REFERENCES spaces(uid),
    asset_url VARCHAR(255) NOT NULL,
    position INTEGER NOT NULL,
    PRIMARY KEY (space_uid, position)
); 