// import { logout } from '../assets/logo';
import { ModeToggle } from './mode-toggle';

export default function Sidebar() {
  return (
    <div className="flex flex-col  h-screen w-20 shadow-lg shadow-[#dbdbde] dark:shadow-slate-900">
      <div className="flex items-center justify-center h-16 ">
        {/* <img src={logo} alt="Logo" className="w-9 h-8" /> */}
        <a href='/'><BrandLogo /></a>
      </div>
      <div className="flex items-center justify-center m-3 rounded-lg py-2 px-3 bg-[#F1EEFA99]">
        <svg
          width="33"
          height="37"
          viewBox="0 0 30 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Frame" clip-path="url(#clip0_683_390)">
            <path
              id="Vector"
              d="M3.75 15.1458H13.75V3.6875H3.75V15.1458ZM3.75 24.3125H13.75V17.4375H3.75V24.3125ZM16.25 24.3125H26.25V12.8542H16.25V24.3125ZM16.25 3.6875V10.5625H26.25V3.6875H16.25Z"
              fill="#623FC4"
            />
          </g>
          <defs>
            <clipPath id="clip0_683_390">
              <rect
                width="30"
                height="27.5"
                fill="white"
                transform="translate(0 0.25)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
      <nav className="flex-grow"></nav>
      <ModeToggle />
      <button className="w-12 h-12 p-3 mb-2 mx-auto rounded-full bg-slate-200 hover:bg-slate-100 dark:hover:bg-slate-300">
        <svg
          width="25"
          height="28"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Frame" clip-path="url(#clip0_683_361)">
            <path
              id="Vector"
              d="M5 22.5H7.5V25H22.5V5H7.5V7.5H5V3.75C5 3.41848 5.1317 3.10054 5.36612 2.86612C5.60054 2.6317 5.91848 2.5 6.25 2.5H23.75C24.0815 2.5 24.3995 2.6317 24.6339 2.86612C24.8683 3.10054 25 3.41848 25 3.75V26.25C25 26.5815 24.8683 26.8995 24.6339 27.1339C24.3995 27.3683 24.0815 27.5 23.75 27.5H6.25C5.91848 27.5 5.60054 27.3683 5.36612 27.1339C5.1317 26.8995 5 26.5815 5 26.25V22.5ZM7.5 13.75H16.25V16.25H7.5V20L1.25 15L7.5 10V13.75Z"
              fill="#241A3F"
            />
          </g>
          <defs>
            <clipPath id="clip0_683_361">
              <rect width="30" height="30" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>
    </div>
  );
}

export { BrandLogo };

function BrandLogo() {
  return (
    <svg
      width="50"
      height="55"
      viewBox="0 0 334 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="333.645" height="300" fill="white" />
      <rect x="40" y="49" width="254" height="202" fill="url(#pattern0)" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_346_558"
            transform="scale(0.00284091 0.00357223)"
          />
        </pattern>
        <image
          id="image0_346_558"
          width="352"
          height="280"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWAAAAEYCAYAAABiECzgAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAABPJSURBVHgB7d1dchRHusbxN0tiLsZcaAnyDqTLYz5c7ECswI00RMwdrRWotYJGdxPhAWlWIHZAG9P4EnaAlkCYM4o4mK48lV0tC8n6qO6uynoz8/+LmIiZMb4CHoon33zTCBCgfv5+7ffi9JkxNs+M2f15dO+DAIExAgRmJ3+3ZW0xLP/r+tn/Z8Qc3THZ/r9G/3MiQCAIYATjn/lv63/YyaEVya/5ISdizP7L0b0jAQJAAEO9s7pBTNEvf8mu1fhXTv5mVh7xNQztCGCo9o/817yw5lC+qRvqopaAdgQwVHJfvZ/ldGit7clyqCWgFgEMdXYevntmzWRQs26opfyF/uGOWXnM1zA0IYChhqsbrDV7NxyyLS2z2fPVzBwQxNCAAEbnqkO2/+6Vvxr74ge1BFQggNGpaqZ3cthk3VBXeUj3qjyk2+VrGF0hgNGJGjO9/lgzKLIvB0ejR58E8IgAhlcLzPT6Qi0B7whgeLPMTK8vzA7DJwIYravqhmJoxW5JKMpa4uWbe/sCtIgARqvamOn1iFoCrSKA0YrZTG/51SsbEjhqCbSFAEajOpjp9eVTWUs8p5ZAkwhgNCbwuqGuE2Oy3RejH14JsCQCGEtTNdPrCbUEmkAAY2HnM712IGkqD+nk4OXo/nMBFkAAYyEhzPR6dLJizGPepcO8CGDMJcW6oS5qCcyLAEZt2w/HewqvEGvD7DBqI4BxK+qGhfAuHW5FAONaEc/0ekMtgZsQwLhSIjO9vlBL4EoEMC54mo83CmuHHLI1j3fpcBkBjCnqBn94lw5nCGDMngUqhsIhm0/UEiCAU8ZMb/d4ly5tBHCCFD8LlC4WwCeJAE4MM72qUUskhgBOhPvq/WxPD4N6FihRzA6ngwBOADO9gaKWiB4BHLHZs0B7HLIFjVoiYgRwhJjpjQ+1RJwI4Mhs5+OeTGd6qRsixLt0kSGAI8FMb1J4ly4SBHDgmOlNF7VE+AjggDHTC+FduqARwAGq6oZiyEwvvsEC+AARwIFhphc3oZYICwEciNlMr9vTuyHAzZgdDgQBrBwzvVgCtYRyBLBi1A1oArWEXgSwQjwLhBZQSyhEACtyPtNrBwK0gHfpdCGAlWCmFz7xLp0OBHDHuEKMDlFLdIwA7tD2w/EeV4jRNd6l6w4B3AHqBqjEAnjvCGCPps8CyenQWtsTQCdqCY8IYE+Y6UVImB32gwBuGTO9CBq1RKsI4JZwhRgRoZZoCQHcgp383ZadPgvEIRviQS3RPAK4Qcz0IgG8S9cgArgBPAuEBJ1kxj759+jBSLAwAnhJzPQiZdQSyyGAFzSd6bWnhzwLBPAu3aII4AUw0wtciQXwcyKA5zB7FmiPQzbgetQS9RHANTDTC8yN2eEaCOBbbOfjnkxneqkbgAVQS9yAAL4GM71Ac6glrkYAX8KzQEBrqCUuIYC/wUwv0D7epTtHAAt1A9AF9y7d1+z/9o9Gjz5JojJJnJvp/WK/vid8Ab8KU/Qze+f99KA7Ucl+Ac9met2e3g0B0KlU36VLLoCZ6Y2J/VT+xv3A314iktgC+KQqCFc3/G7/9yPhGz5r7EFh7n7/4pf7j8qT9SfiTtgRPmMH2z++/ZhKLZHEFzDPAsXDnaAbY3cvr0Hs5a/XjKwOjDXPBFFIYXY46gBmpjcm9lM1Q3rzxq1e/tt6ZievhVHCeERcS0QbwMz0xsS8KszfnxyNNmuPK1VXyO2e8PMfiygvcUQXwMz0RmWpVxfc17CRSVlLyE+CKMRWS0QVwNsPx3s8CxQDVze4Bd8PBtKAXnkGkFl7LHwNxyKad+miCGDqhngYI6OJrJR1Q/NfONv5rwOpDun4AzoOwb9LF3QAT58FktOhtbYnCJ2X30zUEvEJuZYINoB5Figixu4Xcvf5PIdsy+KQLjpBvksXXADzLFA82qwb6prVEnuCWAS1AD6YAOYKcUzcIVu2q2WkaDo7LMWw/CLmhetIhFJLBBHAO/m7LTt9Foi/LobOXSG2cnfgs26oi1oiOupnh1UHMDO98XB1gxG7r/3Eujqk+9rnSnNU1NYSKgP4/AoxM73hq3eFWBuuNMdHYy2hLoCZ6Y2H5rqhLmqJ6KiqJdQEcFU3FEMrHISE7rqNZaFidjg+Wt6lUxHAzPTGIsy6oS7+dhYhawZF9uWgq3fpOg1gZnpj4jaWZbtHAd5Gmhezw9HprJboJICZ6Y1K8PfxF0EtEZ8u3qXzHsDVoYab6aVuCFu1scz3FWJtOKSLkMcF8N4CmJneeGi4QqyJew4pk9U+tURUvNQSrQcwzwJFJcm6oS5XS6zYyXH5kbEhiELbs8OtBjCnxhHpYGNZqKglItRSLdFKAFM3xIO6YTEc0kWp8Vqi8QDmWaBY6NpYFiquNMenyVqisQCezfQO6b/CF8MVYm2287flIZ24BT/rghg08i7d0gHMTG88QtlYFipqiSidrBjz+OfRvQ+ygKUCmCvEsYj7CrE2O/mbLWsz9ltHZNFaYqEAfpqPNwprhxyyhY+6oTtcaY7O3O/SzRXA1A3xiG1jWaioJaJUewF87QBmpjcW1A0aMTscnzq1xK0BzExvTNLZWBYid6XZyOqA55CicuPs8I0BzExvNLhCHBBmh6N0ZS1xZQBTN8SCjWUho5aIz+Va4kIAu0O2z3I6tNb2BEHjCnEcOKSL0p+1xJ8BzExvNE5M2fO+GP3wShANaokIGbtvmOmNCBvLojebHXaHdHwoBc8cme0f334U/lQNWlU3mN2jBa9DIizUErGoAtgKAsXGspRxSBc6c5QJguSuEBfm7veEb7rcz/3LX+5/76onQZAI4MC4uiEz9tHh6EGfrhfOy9GDQWFWyiA2HLwGhgoiGFwhxu2oJUJCBREIc1TVDYQvbuZqifJr+JGrqATq8QWsG1eIsTBmh7UzR6sChaorxK7bE2BBs1uQ31NL6EUFoYw7ZCvM6ibhi6ac1xLyH4EqVBB6UDegdb18vJFZeyx8DSvAIZwCrm6w+4X5bpPwRdvcbUlmh/UggDv0bd3ATC98OpsdppboFodw3WBjGTo3O6TrlYd0Iw7pusEXsGfVFeLvNglfaMGV5u4QwJ5UdYPZ5AoxtDqrJYzISOAFFUTrqivEL7jFhgDMaolHzA77wRdwi843lhG+CAuzw34wB9wCVzcYsfuMlSEGXGluC1eRG0bdgPicX2l+2xcr7jmkdUEjqCAaw8YyxM392qaWaBYVxPK4Qozk7ORvtqzNhsLX8BJ4E24JbCwDZq807wkWwC6IhbCxDKhwpXk5HMLNh7oBuIQrzYvjC7gWNpZp1c/fr7n/CDpXzQ7/scmV5vrogG/h6oaJrDyZ/SkPJVzo/l78d6/s4fvl/zypHiy9dyRQwc0Or9jJcRkuG4JrcAh3EzaWKfWP/Ne8sOZQLv1V1+0wuGNWnvyLPyzV4ErzTQjgK7krxFbusqNXmX+WX1V/2Mlh+Qs2v/EHWjMosi8HR6NH/Pwp4L6GjUwGxspPgm8QwBdUdYPZda8GCFTZfjgu64airBtM3b6XWkIZrjRfRgDPVFeIucWmz3V1Q12m/EV+x2T71BJ6zK40u1oi8cNT5oDZWKaUO2TbyceHZfgu9cVkxfa+2MnH6Rc0VJhdad5kdjjhKYjywOaDMXaXsTJ9dh6+e2bNZDBH3VAXB6vKpH1Il2QFQd2g1dN8vFFYO7z1kG1J1BL6pHmlObkKwryibtDH1Q3bD98OJ9a+bzt8nVkt8X7aRUKFsyvN5cdRUn87SeULmCvESu3k77asLbrcqnWyYszjn5l8USOdWiL6CoKNZVrVnun1hFpCl2p2+GvfWPNMohVxAHOFWKfqCvHpszlnen1hdliZuGeH4wxg6gallp3p9ejkb2blEV/DesRZS8QWwG5jmdx9zhViXdxX72c5HVprexKQzGbPVzNzQBDrEN+V5kgCmLpBrxZnen2hllCml483MmuPJfiv4eAD2B2yZbv85tDH1Q3Wmj0th2zLYtOaPrPZYXdIF+gf7gEHMBvLdLq0pzc+bFpTJexaIsAAdnWDEbvPIZs+1Uzv5DDguqEuagllwjykCyqAuUKslbaZXl+YHdYnrCvNgVxFZmOZTtUV4vHeF/v1fWrh67BpTZ+zK82us5cAqP4CZmOZXgHN9PrCpjVl9NcSaisI6gatqrqhGJZff1uCv6CW0EX3IZ3KCsJtLFvdJHz1cTO9Vd1A+F6HTWu6uLsBh6P7vemmNXd4qoymL2CuECs1m+kd8sT43Ni0pszsOSQ3O7wunVNRQVQby7hCrE/0M72eUEvooqeW6DiAuUKsV3WA4fb0Rj/T6wuzw8rs5G+2rM063EXdXQBTNyiV6kyvR2xaU6a72eEuApiNZSqd7+m1A0Hr2LSmSze1hMcApm7Qi5nezlBLKON3dthLALOxTCvqBh3YtKZLL3+9lslqv/1aouUAZmOZXhHs6Y0Pm9ZUcbXEip0ctzd+2VIAs7FML2Z61aOWUKa9WqLxAOYKsVbM9IaF2WFd2jmkazCAqRv0om4IWFlLvHxzb1+gQrOvNDcQwGws0+tpPt4orB1yyBY8Nq0p08yV5qUCmLpBK2Z640QtocvytcTCAew2lmW7zPTqw0xv9NzuFD58FFn8kG7+AOYKsVLM9CaHTWvKzH+lufY+YFc32P3CfLdJ+OqT8rNACVufWPt+58fxofvDV9C5s+eQrJH/1P13bv0C5gqxXtQNmGF2WJl6tcTNFQQnr0q5Q7bPcjq01vYEOMemNUWqQ7qvfWPNs6t/xHUBzMYytZjpxW3YtKbL9bPDlwK4qhvM7hHFvjrM9GJO1BLK/LWWqAL4Y3nItsbGMp24QoxlsGlNlwuzw8Y8Mb3yN7j7B9QN+uzk77bs9FkgDtmwJDatqeJy12WuEajDTC9aQi2hDAGsyPkV4qLPIRvawpVmPQhgJZjphXdsWuscAdwxZnrRMeb9O0QAd4iZXmhBLdENArgDs2eB9jhkgzJsWvOMAPaImV4Egk1rnhDAnlQzvZND6gaEglqifQRwy5jpReCYHW4RAdwSZnoRGTattYAAbgEzvYgVm9aaRQA3qKobiqEVuyVAvKglGkIAN4SZXqSmDI8Pd8zKY76GF0cAL2k20+v29G4IkCI2rS2MAF4QM73ABdQSCyCAF1Bttnd7eqkbgG8xOzwfAngOzPQCNbFprRYCuIbzmV47EAB1UUvcggC+BTO9wHKoJa5HAF+DugFo1KeylnhOLXERAXwFZnqB1rBp7RsE8DeY6QX8oJaoEMDCTC/QkeQP6ZIPYOoGoHPJblpLNoCf5uONwtohh2yADinWEskFMDO9gGpJ1RJJBTAzvUAYUtm0lkkidn58+7oM39dC+ALquUmkL3bycfvheE8ilkQAu76XrhcIkLE9iVgSATwd+jbmibh+CUAQjJFRYcxjiVhSHXAvf71mZHVgrHkmAJSyn6qDuPvPJXJJjqH18t/WMzuhDwaUscYeWLk7OBptJvG6RtIXMarF6taV/OsCoDOubjBi9/89ejCShCR/E859DRuZlLWE/CQAPEunbrgKuyBmevl4I7P2WPgaBjwxR4X5+24qdcNVCOBLtvNfB2URFfXsIdCxk8zYJ6nVDVchgK9ALQG0wdUNcvBy9GAgmCKAb8AhHdAMd8g2kZUnRzxLdAEBfAs3O5zJap9aAlgIdcMNCOCaXC2xYifHvJYB1FHVDYXcfZ7yIdttCOA5UUsAN6NuqI8AXgCHdMCVTozJdl+MfnglqIUAXgKzw0AltSvETSGAGzCbHXYLfnhXDkmp6gaze8Qz8wshgBtCLYG0pH2FuCkEcMM4pEPsqBuaQwC3hCvNiE2qG8vaRAC3aDY7fMhzSAgbdUNbCGAPqCUQLjaWtYkA9oRDOgSGK8QeEMCe8RwSdGNjmU8EcEe287d9seJmh9cFUIArxP4RwB2iloAS1A0dIYAV4JAO3WBjWdcIYEWYHYYv1A06EMDKTA/ppBiWX8RbAjSPjWWKEMBKUUugaVwh1ocAVqw6pPvaN9WmNWAhbCzTiwAOALPDWAxXiLUjgAPC7DDqom4IAwEcGGaHcRM2loWFAA7UTv5my9psKHwNY4q6IUQEcOCYHQYby8JFAEeAWiJZXCEOHAEcEWaHU8HGslgQwJHp5a/XjKwOmB2OE1eI40IAR4rZ4ehQN0SIAI4ctUTo2FgWMwI4ARzShYm6IX4EcEJ6+Xgjs/ZY+BrWjo1liSCAE8TssF5cIU4LAZwoagld2FiWJgI4cRzSdY0rxCkjgDGdHc5ktU8t4Rd1Awhg/MnVEit2cmxFNgStYWMZzhDA+AtqibZQN+AiAhhX4pCuaWwsw18RwLgRs8NL4woxrkUAo5bZ7LBb8LMmqIGNZbgdAYzaqCXq4Qox6iKAMTcO6a5F3YC5EMBYGFeaz7CxDIshgLGU2ezwoRXJJUHUDVgGAYxGJFhLsLEMSyOA0ZhUDum4QoymEMBoXKzPIbGxDE0jgNGa7fxtX6y42eF1CRpXiNEOAhitCr2WoG5AmwhgeBHaIR0by+ADAQyv9M8OUzfAHwIY3k0P6aQYll/EW6IKG8vgFwGMziiqJbhCjE4QwOhUdUj3tW+qTWuesbEM3SKAoYLv2WGuEEMDAhiqeJgdpm6AGgQw1GlndpiNZdCHAIZaO/mbLWuzoSz5NUzdAK0IYKi3xOwwG8ugGgGMIMxbS3CFGCEggBGU22aH2ViGkBDACE4vf71mZHVwcXaYK8QIDwGMYP35HJKxvzDdgBD9P+wc33OUaizEAAAAAElFTkSuQmCC"
        />
      </defs>
    </svg>
  );
}
