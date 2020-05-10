import styled from "styled-components";

export const StyledNotFound = styled.div`

    position: absolute;
    top: 50px;
    left: 0;
    width: 100%;
    font-family: 'Fira Sans' ,'Abel', sans-serif;
    color: #fff;
    overflow: hidden;
    
    .background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(#0C0E10, #446182);

        .ground {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 25vh;
            background: #0C0E10;

            @media (max-width: 770px) {
                height: 0vh;
            }
        }
    }

    .container {
        position: relative;
        margin: 0 auto;
        width: 85%;
        height: 95vh;
        padding-bottom: 25vh;
        display: flex;
        flex-direction: row;
        justify-content: space-around;

        @media (max-width: 770px) {
            flex-direction: column;
            padding-bottom: 0vh;
        }
    }

    .left-section, .right-section {
        position: relative;
    }

    .left-section {
        width: 40%;

        @media (max-width: 770px) {
            width: 100%;
            height: 40%;
            position: absolute;
            top: 0;
        }

        .inner-content {
            @extend {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
            }

            @media (max-width: 770px) {
                position: relative;
                padding: 1rem 0;
            }
        }
    }

    .heading {
        text-align: center;
        font-size: 9em;
        line-height: 1.3em;
        margin: 2rem 0 0.5rem 0;
        padding: 0;
        text-shadow: 0 0 1rem #fefefe;

        @media (max-width: 770px) {
            font-size: 7em;
            line-height: 1.15;
            margin: 0;
        }
    }

    .subheading {
        text-align: center;
        max-width: 480px;
        font-size: 1.5em;
        line-height: 1.15em;
        padding: 0 1rem;
        margin: 0 auto;

        @media (max-width: 770px) {
            font-size: 1.3em;
            line-height: 1.15;
            max-width: 100%;
        }
    }

    .link {
        text-align: center;
        font-size: 2em;
        paddding: 1rem;
        margin-top: 10%;
        color: #FFF;
        text-decoration: none;
    }

    .right-section {
        width: 50%;
        top: 1 rem;
        @media (max-width: 770px) {
            width: 100%;
            height: 60%;
            position: absolute;
            bottom: 0;
        }
    }

    .svgimg {
        position: absolute;
        bottom: 0;
        padding-top: 10vh;
        padding-left: 1vh;
        max-width: 100%;
        max-height: 100%;

        @media (max-width: 770px) {
            padding: 0;
        }

        .bench-legs {
            fill: #0C0E10;
        }

        .top-bench, .bottom-bench {
            stroke: #0C0E10;
            stroke-width: 1px;
            fill: #5B3E2B;
        }

        .bottom-bench path:nth-child(1) {
            fill: darken(#5B3E2B,7%);
        }

        .lamp-details {
            fill: #202425;
        }

        .lamp-accent {
            fill: lighten(#202425, 5%);
        }

        .lamp-bottom {
            fill: linear-gradient(#202425, #0C0E10);
        }

        .lamp-light {
            fill: #EFEFEF;
        }

        @keyframes glow {
            0% 
            text-shadow: 0 0 1rem #fefefe
        50% 
            text-shadow: 0 0 1.85rem #ededed
        100%
            text-shadow: 0 0 1rem #fefefe
        }
        
    }
`;
