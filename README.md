# package-rank

[![npm version](https://badge.fury.io/js/package-rank.svg)](https://npmjs.org/package/package-rank)

`package-rank` is To Find Out The Package Search Rank.

```sh
yarn add -E package-rank
```

<table>
  <tr></tr>
  <tr>
    <td align="center">
      <a href="https://www.technation.sucks">
        <img src="https://raw.githubusercontent.com/artdecoweb/www.technation.sucks/master/anim.gif" alt="Tech Nation Visa" />
      </a><br />
      Sponsored by <a href="https://www.technation.sucks">Tech Nation Visa Sucks</a>.
    </td>
  </tr>
</table>

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [CLI](#cli)
  * [`--help`, `-h`](#--help--h)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/0.svg?sanitize=true"></a></p>

## CLI

The package can be used from the CLI.

```sh
package-rank PACKAGE_NAME -s SEARCH_QUERY
```

For example, to find out how the [_Documentary_](https://github.com/artdecocode/documentary) package ranks for the `documentation` keyword, the following command is used:

```sh
package-rank documentary -s documentation
```

```
250
500
Found: 567
```

### `--help`, `-h`

```
Shows the package rank in the NPM search using npms.io API.

  package-rank PACKAGE_NAME -s SEACH_QUERY [-vh]

  	--search, -s 	The search query to check.
	--version, -v	Show the version.
	--help, -h   	Display help.
  
  Example:
    package-rank documentary -s documentation
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/1.svg?sanitize=true"></a></p>

## Copyright

<table>
  <tr>
    <th>
      <a href="https://artd.eco">
        <img src="https://raw.githubusercontent.com/wrote/wrote/master/images/artdeco.png" alt="Art Deco" />
      </a>
    </th>
    <th>© <a href="https://artd.eco">Art Deco</a> 2019</th>
    <th>
      <a href="https://www.technation.sucks" title="Tech Nation Visa">
        <img src="https://raw.githubusercontent.com/artdecoweb/www.technation.sucks/master/anim.gif" alt="Tech Nation Visa" />
      </a>
    </th>
    <th>
      <a href="https://www.technation.sucks">Tech Nation Visa Sucks</a>
    </th>
  </tr>
</table>

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/-1.svg?sanitize=true"></a></p>