<?php
$out = [
    "providers" => [
        "nameLookup" => [],
        "uris" => [],
    ],
];
foreach (yaml_parse_file("config.yaml") as $k => $v) {
    if ($k !== "providers") {
        $out[$k] = $v;
        continue;
    }
    foreach ($v as $name => $provider) {
        $out["providers"]["nameLookup"][$name] = $name;
        $out["providers"]["uris"][$name] = $provider["url"];
        if (!isset($provider["aliases"])) {
            $provider["aliases"] = [];
        }
        foreach ((array) $provider["aliases"] as $alias) {
            $out["providers"]["nameLookup"][$alias] = $name;
        }
    }
}

echo json_encode(
    $out,
    JSON_UNESCAPED_SLASHES + JSON_UNESCAPED_UNICODE + JSON_PRETTY_PRINT
);
