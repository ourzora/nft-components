# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.2] - 2021-12-17
- Fix auction history to include etherscan links on winning bids and mints
- Fix audio rendering preview preference priority

## [0.3.1] - 2021-12-17
- Handle application/svg+xml mime type as image

## [0.3.0] - 2021-12-16
- Handle new ens fetching with latest minor version release of nft-hooks

## [0.2.4] - 2021-12-02
- Use preferred `ipfs.io/ipfs/` gateway and include setting to set new gateway to prevent media load failures
- Make sure to test that the new gateway works for you – removing the gateway from the theme config will revert to previous behavior.

## [0.2.3] - 2021-11-19
- Fix layout having an unneeded additional wrapping class #94

## [0.2.2] - 2021-11-16
- Fix className issue with video and audio player #100
- Fix issues with mint date formatting #99
- Fix issues with duplicate mint date formatting #98

## [0.2.1] - 2021-11-10
- Add collection tag element
- Add properties list element
- Fix wrapping around AuctionInfo

## [0.2.0] - 2021-11-09
- Adding `className` prop to all top-level components for `sx` and design system compat
- Fixing auction urls for latest version of zora.co website
- Refactoring AuctionInfo component html layout and sytling

## [0.1.19] - 2021-11-04
- Adding ens and zora username resolution flags to AddressView
- updating nft-hooks lib version

## [0.1.18] - 2021-11-01
- Correctly bumping nft-hooks version to fix ipfs:// data content fetch uri replacement

## [0.1.16] - 2021-10-29
- Fix display username instead of user.name in addressview
- Bumping nft-hooks to fix ipfs:// data content fetch uri replacement

## [0.1.15] - 2021-10-27
- Bump `@zoralabs/nft-hooks` to `0.7.0`

## [0.1.14] - 2021-10-22
### Added
Added ENS name hooks
