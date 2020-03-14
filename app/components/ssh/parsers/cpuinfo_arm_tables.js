/*!
 * Info taken from lscpu-arm.c (https://github.com/karelzak/util-linux/blob/master/sys-utils/lscpu-arm.c)
 */

export const processors = {}

export const implementers = {
    [0x41]: 'ARM',
    [0x42]: 'Broadcom',
    [0x43]: 'Cavium',
    [0x44]: 'DEC',
    [0x48]: 'HiSilicon',
    [0x4e]: 'Nvidia',
    [0x50]: 'APM',
    [0x51]: 'Qualcomm',
    [0x53]: 'Samsung',
    [0x56]: 'Marvell',
    [0x66]: 'Faraday',
    [0x69]: 'Intel',
}

processors[0x41] = {
    [0x810]: 'ARM810',
    [0x920]: 'ARM920',
    [0x922]: 'ARM922',
    [0x926]: 'ARM926',
    [0x940]: 'ARM940',
    [0x946]: 'ARM946',
    [0x966]: 'ARM966',
    [0xa20]: 'ARM1020',
    [0xa22]: 'ARM1022',
    [0xa26]: 'ARM1026',
    [0xb02]: 'ARM11 MPCore',
    [0xb36]: 'ARM1136',
    [0xb56]: 'ARM1156',
    [0xb76]: 'ARM1176',
    [0xc05]: 'Cortex-A5',
    [0xc07]: 'Cortex-A7',
    [0xc08]: 'Cortex-A8',
    [0xc09]: 'Cortex-A9',
    [0xc0d]: 'Cortex-A17',	/* Originally A12 */
    [0xc0f]: 'Cortex-A15',
    [0xc0e]: 'Cortex-A17',
    [0xc14]: 'Cortex-R4',
    [0xc15]: 'Cortex-R5',
    [0xc17]: 'Cortex-R7',
    [0xc18]: 'Cortex-R8',
    [0xc20]: 'Cortex-M0',
    [0xc21]: 'Cortex-M1',
    [0xc23]: 'Cortex-M3',
    [0xc24]: 'Cortex-M4',
    [0xc27]: 'Cortex-M7',
    [0xc60]: 'Cortex-M0+',
    [0xd01]: 'Cortex-A32',
    [0xd03]: 'Cortex-A53',
    [0xd04]: 'Cortex-A35',
    [0xd05]: 'Cortex-A55',
    [0xd07]: 'Cortex-A57',
    [0xd08]: 'Cortex-A72',
    [0xd09]: 'Cortex-A73',
    [0xd0a]: 'Cortex-A75',
    [0xd0b]: 'Cortex-A76',
    [0xd0c]: 'Neoverse-N1',
    [0xd13]: 'Cortex-R52',
    [0xd20]: 'Cortex-M23',
    [0xd21]: 'Cortex-M33',
    [0xd4a]: 'Neoverse-E1',
}

processors[0x42] = {
    [0x0f]: 'Brahma B15',
    [0x100]: 'Brahma B53',
    [0x516]: 'ThunderX2',
}

processors[0x43] = {
    [0x0a0]: 'ThunderX',
    [0x0a1]: 'ThunderX 88XX',
    [0x0a2]: 'ThunderX 81XX',
    [0x0a3]: 'ThunderX 83XX',
    [0x0af]: 'ThunderX2 99xx',
}

processors[0x44] = {
    [0xa10]: 'SA110',
    [0xa11]: 'SA1100',
}

processors[0x48] = {
    [0xd01]: 'Kunpeng-920',
}

processors[0x4e] = {
    [0x000]: 'Denver',
    [0x003]: 'Denver 2',
}

processors[0x50] = {
    [0x000]: 'X-Gene',
}

processors[0x51] = {
    [0x00f]: 'Scorpion',
    [0x02d]: 'Scorpion',
    [0x04d]: 'Krait',
    [0x06f]: 'Krait',
    [0x201]: 'Kryo',
    [0x205]: 'Kryo',
    [0x211]: 'Kryo',
    [0x800]: 'Falkor V1/Kryo',
    [0x801]: 'Kryo V2',
    [0xc00]: 'Falkor',
    [0xc01]: 'Saphira',
}

processors[0x53] = {
    [0x001]: 'Exynos M1',
}

processors[0x56] = {
    [0x131]: 'Feroceon 88FR131',
    [0x581]: 'PJ4/PJ4b',
    [0x584]: 'PJ4B-MP',
}

processors[0x66] = {
    [0x526]: 'FA526',
    [0x626]: 'FA626',
}

processors[0x69] = {
    [0x200]: 'i80200',
    [0x210]: 'PXA250A',
    [0x212]: 'PXA210A',
    [0x242]: 'i80321-400',
    [0x243]: 'i80321-600',
    [0x290]: 'PXA250B/PXA26x',
    [0x292]: 'PXA210B',
    [0x2c2]: 'i80321-400-B0',
    [0x2c3]: 'i80321-600-B0',
    [0x2d0]: 'PXA250C/PXA255/PXA26x',
    [0x2d2]: 'PXA210C',
    [0x411]: 'PXA27x',
    [0x41c]: 'IPX425-533',
    [0x41d]: 'IPX425-400',
    [0x41f]: 'IPX425-266',
    [0x682]: 'PXA32x',
    [0x683]: 'PXA930/PXA935',
    [0x688]: 'PXA30x',
    [0x689]: 'PXA31x',
    [0xb11]: 'SA1110',
    [0xc12]: 'IPX1200',
}
